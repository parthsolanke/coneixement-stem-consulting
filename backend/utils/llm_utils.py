# utils/llm_utils.py
import os
from utils.models import QuizResponse
from utils.context import QUIZ_CONTEXT
from dotenv import load_dotenv
import google.generativeai as genai

env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
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
        response_schema=QuizResponse
    )
)
gemini_chat_session = model.start_chat(history=QUIZ_CONTEXT)

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
    