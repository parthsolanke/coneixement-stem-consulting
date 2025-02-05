# utils/llm_utils.py
from utils.models import QuizResponse
from utils.context import QUIZ_CONTEXT, REPORT_CONTEXT
from utils.config import GEMINI_API_KEY, MODEL
import google.generativeai as genai
import json
import re
import logging

logger = logging.getLogger(__name__)

# gemini config
genai.configure(api_key=GEMINI_API_KEY)

def create_default_section():
    return {
        "profile_overview": {
            "title": "Profile Overview",
            "description": "Analysis of your assessment results",
            "key_characteristics": []
        },
        "strength_academic_mapping": {
            "title": "Academic Strengths Analysis",
            "mappings": []
        },
        "growth_areas": {
            "title": "Areas for Development",
            "description": "Opportunities for growth and improvement",
            "development_paths": []
        },
        "educational_pathways": {
            "title": "Educational Pathways",
            "paths": []
        },
        "career_exploration": {
            "title": "Career Paths",
            "paths": []
        },
        "reflection_questions": {
            "title": "Self-Reflection Questions",
            "questions": []
        }
    }

# quiz model configuration
quiz_model = genai.GenerativeModel(
    model_name=MODEL,
    system_instruction="""
    You are an Expert in career guidance.
    Your task is to generate quiz (15 questions only)
    for students to evaluate and identify potential career
    paths that align with their interests, skills and personality.
    Don't give any explanation for the quiz.
    Quiz should be based on the following traits:
    - Openness
    - Conscientiousness
    - Extraversion
    - Agreeableness
    - Neuroticism
    
    Each question should be multiple choice with 4 options.
    - Strongly Disagree
    - Disagree
    - Agree
    - Strongly Agree
    
    Each option would be assigned a score from 1 to 4.
    1 for Strongly Disagree and 4 for Strongly Agree.
    
    Your response must be a JSON object containing 15 questions.
    A quiz object has the following schema:
    
    Quiz = {
        'questions': list[{
            'index': int,
            'question': str,
            'trait': str,
        }],
    }

    Return: list[Quiz]
    """,
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        response_schema=QuizResponse
    )
)

# report model configuration
report_model = genai.GenerativeModel(
    model_name=MODEL,
    system_instruction="""
    You are an AI career counselor generating a section of a career assessment report.
    Respond only with the requested section following the exact structure provided.
    Keep responses focused and concise while maintaining meaningful insights.
    Each response must be valid JSON and contain only the requested section.
    Do not include any explanations or additional text outside the JSON structure.
    """,
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        temperature=0.7,
        top_p=0.8,
        top_k=40,
        max_output_tokens=1000
    )
)

quiz_chat_session = quiz_model.start_chat(history=QUIZ_CONTEXT)
report_chat_session = report_model.start_chat(history=REPORT_CONTEXT)

def transform_response(response_data: dict) -> dict:
    if not isinstance(response_data, dict) or 'report' not in response_data:
        response_data = {'report': response_data}
    
    default_structure = create_default_section()
    
    if 'report' in response_data:
        for section in default_structure:
            if section in response_data['report']:
                default_structure[section].update(response_data['report'][section])
    
    return {'report': default_structure}

def clean_response_text(text: str) -> str:
    text = text.strip().strip('"\'')
    text = re.sub(r'\n{2,}', '\n', text)
    text = re.sub(r'\s{2,}', ' ', text)
    text = re.sub(r'[^\x20-\x7E]', '', text)
    return text.strip()

def parse_json_response(text: str) -> dict:
    
    text = text.strip().strip('"\'')
    
    try:
        return json.loads(text)
    except json.JSONDecodeError as e1:
        logger.warning(f"Direct parse failed: {e1}")
        
        try:
            match = re.search(r'\{[\s\S]*\}', text)
            if match:
                json_str = match.group()
                return json.loads(json_str)
        except Exception as e2:
            logger.warning(f"JSON object search failed: {e2}")
            
        try:
            fixed_text = re.sub(r'\s+', ' ', text).strip()
            fixed_text = re.sub(r',\s*([\]}])', r'\1', fixed_text)
            return json.loads(fixed_text)
        except Exception as e3:
            logger.warning(f"Fixed JSON parse failed: {e3}")
            
    logger.error("All JSON parsing attempts failed")
    raise ValueError(f"Could not parse JSON response. Original text:\n{text}")

async def generate_quiz_with_context(query: str) -> str:
    try:
        response = await quiz_chat_session.send_message_async(query)
        return response.text
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""

async def generate_report_with_context(query: str) -> str:
    try:
        
        response = await report_chat_session.send_message_async(query)
        response_text = response.text
        
        try:
            json_response = parse_json_response(response_text)
            return json.dumps(json_response)
        except Exception as e:
            logger.error("Failed to parse LLM response", exc_info=True)
            logger.error(f"Problematic response text:\n{response_text}")
            raise
            
    except Exception as e:
        logger.error("Error in generate_report_with_context", exc_info=True)
        raise

async def generate_quiz_without_context(query: str) -> str:
    try:
        response = await quiz_model.generate_content_async(query)
        return response.text
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""

async def generate_report_without_context(query: str) -> str:
    try:
        response = await report_model.generate_content_async(query)
        return response.text
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""
