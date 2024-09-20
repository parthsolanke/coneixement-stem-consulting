from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import random

app = FastAPI()

# Allow CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load sample questions from JSON file
with open("./backend/quiz/questions.json", encoding='utf-8') as f:
    questions_data = json.load(f)

personality_questions = questions_data["personalityQuestions"]
marking_scheme = questions_data["markingScheme"]

class Question(BaseModel):
    index: int
    question: str
    trait: str

class Response(BaseModel):
    index: int
    answer: int

class UserResponse(BaseModel):
    responses: List[Response]

class LLMRequest(BaseModel):
    prompt: str

class LLMResponse(BaseModel):
    questions: List[Question]

@app.get("/questions", response_model=List[Question])
def get_all_questions():
    return personality_questions

@app.get("/questions/{trait}", response_model=List[Question])
def get_questions_by_trait(trait: str):
    trait_questions = [q for q in personality_questions if q["trait"].upper() == trait.upper()]
    if not trait_questions:
        raise HTTPException(status_code=404, detail="Trait not found")
    return trait_questions

@app.post("/assess")
def assess_responses(user_response: UserResponse):
    score_by_trait = {}
    for response in user_response.responses:
        question = next((q for q in personality_questions if q["index"] == response.index), None)
        if question is None:
            raise HTTPException(status_code=400, detail=f"Question with index {response.index} not found")

        trait = question["trait"]
        score = marking_scheme[str(response.answer)]["score"]
        if trait in score_by_trait:
            score_by_trait[trait].append(score)
        else:
            score_by_trait[trait] = [score]

    average_scores = {trait: sum(scores) / len(scores) for trait, scores in score_by_trait.items()}
    return {"scores": average_scores}

@app.post("/llm/generate-questions", response_model=LLMResponse)
def generate_questions(llm_request: LLMRequest):
    # Placeholder for LLM integration
    prompt = llm_request.prompt
    generated_questions = simulate_llm_generate_questions(prompt)
    return {"questions": generated_questions}

@app.post("/llm/assess", response_model=Dict[str, Any])
def llm_assess_responses(user_response: UserResponse):
    # Placeholder for LLM integration
    responses = user_response.responses
    llm_assessment = simulate_llm_assess_responses(responses)
    return llm_assessment

@app.get("/")
def read_root():
    return {"message": "Welcome to the Personality Assessment API"}

# Placeholder functions for LLM interaction
def simulate_llm_generate_questions(prompt: str) -> List[Question]:
    # Simulate LLM response for generating questions
    random_questions = random.sample(personality_questions, 5)
    return random_questions

def simulate_llm_assess_responses(responses: List[Response]) -> Dict[str, Any]:
    # Simulate LLM response for assessing responses
    score_by_trait = {}
    for response in responses:
        question = next((q for q in personality_questions if q["index"] == response.index), None)
        if question:
            trait = question["trait"]
            score = marking_scheme[str(response.answer)]["score"]
            if trait in score_by_trait:
                score_by_trait[trait].append(score)
            else:
                score_by_trait[trait] = [score]
    average_scores = {trait: sum(scores) / len(scores) for trait, scores in score_by_trait.items()}
    return {"scores": average_scores}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
