# quiz/routes.py
from fastapi import FastAPI, HTTPException
from api.quiz.quiz_utils import generate_quiz, validate_quiz
from api.utils.models import QuizResponse, QuizRequest

app = FastAPI()

@app.post("/", response_model=QuizResponse)
async def get_quiz(request: QuizRequest):
    try:
        quiz_data = await generate_quiz(
            request.extraCurricular,
            request.subjects,
            request.age
        )
        valid, message = validate_quiz(quiz_data)
        if not valid:
            raise HTTPException(status_code=400, detail=message)
        return quiz_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Career Guidance Quiz API!"}
