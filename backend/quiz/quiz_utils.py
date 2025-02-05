# quiz/quiz_utils.py
import json
from utils.llm_utils import call_gemini_with_context

def generate_quiz(extraCurricular: str, subjects: str, age: str) -> dict:
    context = f"""
    Generate a new quiz for career guidance based on the following details:

    Extracurricular Interests: {extraCurricular}
    Subjects of Interest: {subjects}
    Age: {age}

    The quiz should be engaging, age-appropriate, and designed to help the user discover potential career paths based on their interests.  
    Each question should be a statement rather than a "WH" question, allowing the user to respond using the following options:  
    - Strongly Agree  
    - Agree  
    - Disagree  
    - Strongly Disagree  

    Ensure that the statements reflect attitudes, preferences, or opinions related to the user's interests and career aspirations.
    """

    response = call_gemini_with_context(context)
    return json.loads(response)

def validate_quiz(data: dict) -> tuple[bool, str]:
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
            return False, "Each question must contain 'index', 'question', and 'trait'."
        if not isinstance(question['index'], int):
            return False, "The 'index' must be an integer."
        if not isinstance(question['question'], str):
            return False, "The 'question' must be a string."
        if not isinstance(question['trait'], str):
            return False, "The 'trait' must be a string."
    return True, "Response is valid."

