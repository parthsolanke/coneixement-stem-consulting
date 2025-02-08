from utils.llm_utils import generate_report_with_context
from utils.report_sections import SECTION_TEMPLATES, SECTION_VALIDATORS, SECTION_ORDER
from typing import Dict, List, Tuple
import json
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def generate_section(
    section_name: str,
    scores: Dict[str, int],
    strengths: List[str],
    weaknesses: List[str],
    previous_sections: dict = None
) -> dict:
    try:
        template = SECTION_TEMPLATES.get(section_name)
        if not template:
            raise ValueError(f"No template found for section: {section_name}")
        
        format_args = {
            "scores": json.dumps(scores, indent=2),
            "strengths": json.dumps(strengths, indent=2),
            "weaknesses": json.dumps(weaknesses, indent=2),
            "previous_sections": json.dumps(previous_sections or {}, indent=2)
        }
        
        try:
            prompt = template.format(**format_args)
        except Exception as e:
            logger.error(f"Template formatting error: {e}")
            logger.error(f"Template: {template}")
            logger.error(f"Format args: {format_args}")
            raise ValueError(f"Failed to format template: {e}")
        
        response = await generate_report_with_context(prompt)
        
        try:
            section_data = json.loads(response)
            if section_name not in section_data:
                section_data = {section_name: section_data}
            return section_data
            
        except json.JSONDecodeError as je:
            logger.error(f"JSON parsing error: {je}")
            raise ValueError(f"Invalid JSON response: {je}")
            
    except Exception as e:
        logger.error("Section generation failed", exc_info=True)
        raise

async def generate_report(scores: Dict[str, int], strengths: List[str], weaknesses: List[str]) -> dict:
    
    report = {"report": {}}
    
    try:
        for section_name in SECTION_ORDER:
            section_data = await generate_section(
                section_name,
                scores,
                strengths,
                weaknesses,
                report["report"]
            )
            report["report"].update(section_data)
            
        return report
        
    except Exception as e:
        logger.error("Error in report generation", exc_info=True)
        raise

def validate_report(data: dict) -> Tuple[bool, str]:
    try:
        if not isinstance(data, dict) or 'report' not in data:
            return False, "Invalid report structure"
            
        report = data['report']
        for section_name in SECTION_ORDER:
            if section_name not in report:
                return False, f"Missing section: {section_name}"
                
            validator = SECTION_VALIDATORS.get(section_name)
            if validator:
                valid, message = validator(report)
                if not valid:
                    return False, f"Invalid {section_name}: {message}"
                    
        return True, "Report is valid"
    except Exception as e:
        return False, str(e)
