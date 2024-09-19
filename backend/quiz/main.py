from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from utils.quiz_utils import generate_quiz, validate_quiz

app = FastAPI()

class Question(BaseModel):
    index: int
    question: str
    trait: str

class Quiz(BaseModel):
    questions: List[Question]

@app.post("/quiz", response_model=Quiz)
async def get_quiz():
    try:
        quiz_data = generate_quiz()
        valid, message = validate_quiz(quiz_data)
        if not valid:
            raise HTTPException(status_code=400, detail=message)
        return quiz_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Career Guidance Quiz API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
