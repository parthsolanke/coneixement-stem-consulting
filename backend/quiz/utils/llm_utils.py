# utils/llm_utils.py
import os
import json
from pathlib import Path
from typing import Tuple
from utils.models import Quiz
from utils.context import CONTEXT
from dotenv import load_dotenv
import google.generativeai as genai

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# env vars
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
MODEL = os.environ.get("MODEL")
    
# gemini config
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(
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
        response_schema=Quiz
    )
)
gemini_chat_session = model.start_chat(history=CONTEXT)

def call_gemini_with_context(query: str) -> str:
    try:
        response = gemini_chat_session.send_message(query)
        return response.text
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""

def call_gemini_without_context(query: str) -> str:
    try:
        response = model.generate_content(query)
        return response.text
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""

def validate_quiz_response(response: str) -> Tuple[bool, str]:
    try:
        data = json.loads(response)
        
        if not isinstance(data, dict):
            return False, "Response must be a dictionary."
        
        if 'questions' not in data:
            return False, "Response must contain 'questions' key."
        
        questions = data['questions']
        if not isinstance(questions, list) or len(questions) != 15:
            return False, "Response must contain exactly 15 questions."
        
        for question in questions:
            if not isinstance(question, dict):
                return False, "Each question must be a dictionary."
            if 'index' not in question or 'question' not in question or 'trait' not in question:
                return False, "Each question must contain 'index', 'question' and 'trait'."
            if not isinstance(question['index'], int):
                return False, "The 'index' must be an integer."
            if not isinstance(question['question'], str):
                return False, "The 'question' must be a string."
            if not isinstance(question['trait'], str):
                return False, "The 'trait' must be a string."
        
        return True, "Response is valid."

    except json.JSONDecodeError:
        return False, "Response is not valid JSON."
    except Exception as e:
        return False, f"Validation error: {str(e)}"
    
if __name__ == "__main__":
    response = call_gemini_with_context("Generate a new quiz for career guidance")
    print(validate_quiz_response(response))
    print(response)
    