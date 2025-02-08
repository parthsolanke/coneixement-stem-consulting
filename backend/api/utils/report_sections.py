from typing import Tuple
import logging
import json

logger = logging.getLogger(__name__)


SECTION_PROMPT = """
You are generating a {section_type} section for a career guidance report.

REQUIRED OUTPUT STRUCTURE:
{structure}

INPUT DATA:
- Scores: {scores}
- Strengths: {strengths}
- Weaknesses: {weaknesses}
{prev_sections}

REQUIREMENTS:
1. Return ONLY a valid JSON object matching the structure above
2. No explanatory text, ONLY JSON
3. Make content meaningful and personalized
4. Do not deviate from the structure
"""

JSON_STRUCTURES = {
    "profile_overview": {
        "profile_overview": {
            "title": "string",
            "description": "string",
            "key_characteristics": ["string"]
        }
    },
    
    "strength_academic_mapping": {
        "strength_academic_mapping": {
            "title": "string",
            "mappings": [{
                "strength": "string",
                "academic_fields": ["string"],
                "potential_applications": "string"
            }]
        }
    },
    
    "growth_areas": {
        "growth_areas": {
            "title": "string",
            "description": "string",
            "development_paths": [{
                "area": "string",
                "improvement_strategies": ["string"],
                "related_fields": "string"
            }]
        }
    },
    
    "educational_pathways": {
        "educational_pathways": {
            "title": "string",
            "paths": [{
                "field": "string",
                "alignment": "string",
                "potential_outcomes": ["string"]
            }]
        }
    },
    
    "career_exploration": {
        "career_exploration": {
            "title": "string",
            "paths": [{
                "field": "string",
                "why_consider": "string",
                "required_skills": ["string"],
                "growth_potential": "string"
            }]
        }
    },
    
    "reflection_questions": {
        "reflection_questions": {
            "title": "string",
            "questions": ["string"]
        }
    }
}

def create_section_template(section_name: str) -> str:
    structure = JSON_STRUCTURES.get(section_name, {})
    
    structure_str = json.dumps(structure, indent=2)
    structure_str = structure_str.replace("{", "{{").replace("}", "}}")
    
    return SECTION_PROMPT.format(
        section_type=section_name.replace('_', ' ').title(),
        structure=structure_str,
        scores="{{scores}}",
        strengths="{{strengths}}",
        weaknesses="{{weaknesses}}",
        prev_sections="" if section_name == "profile_overview" else "\n- Previous Sections: {{previous_sections}}"
    )

SECTION_TEMPLATES = {
    name: create_section_template(name)
    for name in JSON_STRUCTURES.keys()
}

def log_template_debug(section_name: str, context: str):
    """Log template debugging info"""
    logger.debug(f"Template for {section_name}:")
    logger.debug("="*50)
    logger.debug(context)
    logger.debug("="*50)

def validate_profile_overview(section: dict) -> Tuple[bool, str]:
    try:
        data = section["profile_overview"]
        required = ["title", "description", "key_characteristics"]
        missing = [key for key in required if key not in data]
        if missing:
            return False, f"Missing fields in profile_overview: {missing}"
        if not isinstance(data["key_characteristics"], list):
            return False, "key_characteristics must be a list"
        return True, "Valid"
    except Exception as e:
        return False, str(e)

def validate_strength_mapping(section: dict) -> Tuple[bool, str]:
    try:
        data = section["strength_academic_mapping"]
        if "title" not in data or "mappings" not in data:
            return False, "Missing title or mappings"
        for mapping in data["mappings"]:
            required = ["strength", "academic_fields", "potential_applications"]
            missing = [key for key in required if key not in mapping]
            if missing:
                return False, f"Missing fields in mapping: {missing}"
        return True, "Valid"
    except Exception as e:
        return False, str(e)

def validate_growth_areas(section: dict) -> Tuple[bool, str]:
    try:
        data = section["growth_areas"]
        required = ["title", "description", "development_paths"]
        missing = [key for key in required if key not in data]
        if missing:
            return False, f"Missing fields in growth_areas: {missing}"
        for path in data["development_paths"]:
            path_required = ["area", "improvement_strategies", "related_fields"]
            missing = [key for key in path_required if key not in path]
            if missing:
                return False, f"Missing fields in development path: {missing}"
        return True, "Valid"
    except Exception as e:
        return False, str(e)

def validate_educational_pathways(section: dict) -> Tuple[bool, str]:
    try:
        data = section["educational_pathways"]
        if "title" not in data or "paths" not in data:
            return False, "Missing title or paths"
        for path in data["paths"]:
            required = ["field", "alignment", "potential_outcomes"]
            missing = [key for key in required if key not in path]
            if missing:
                return False, f"Missing fields in educational path: {missing}"
        return True, "Valid"
    except Exception as e:
        return False, str(e)

def validate_career_exploration(section: dict) -> Tuple[bool, str]:
    try:
        data = section["career_exploration"]
        if "title" not in data or "paths" not in data:
            return False, "Missing title or paths"
        for path in data["paths"]:
            required = ["field", "why_consider", "required_skills", "growth_potential"]
            missing = [key for key in required if key not in path]
            if missing:
                return False, f"Missing fields in career path: {missing}"
        return True, "Valid"
    except Exception as e:
        return False, str(e)

def validate_reflection_questions(section: dict) -> Tuple[bool, str]:
    try:
        data = section["reflection_questions"]
        if "title" not in data or "questions" not in data:
            return False, "Missing title or questions"
        if not isinstance(data["questions"], list):
            return False, "questions must be a list"
        return True, "Valid"
    except Exception as e:
        return False, str(e)

SECTION_VALIDATORS = {
    "profile_overview": validate_profile_overview,
    "strength_academic_mapping": validate_strength_mapping,
    "growth_areas": validate_growth_areas,
    "educational_pathways": validate_educational_pathways,
    "career_exploration": validate_career_exploration,
    "reflection_questions": validate_reflection_questions
}

SECTION_ORDER = [
    "profile_overview",
    "strength_academic_mapping",
    "growth_areas",
    "educational_pathways",
    "career_exploration",
    "reflection_questions"
]
