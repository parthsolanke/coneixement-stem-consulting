# utils/models.py
from pydantic import BaseModel
from typing import Dict, Any, List

class Question(BaseModel):
    index: int
    question: str
    trait: str

class QuizResponse(BaseModel):
    questions: List[Question]
    
class QuizRequest(BaseModel):
    extraCurricular: str
    subjects: str
    age: str

class Context:
    def __init__(self):
        self.context_data: Dict[str, Any] = {}

    def set(self, key: str, value: Any) -> None:
        self.context_data[key] = value

    def get(self, key: str, default: Any = None) -> Any:
        return self.context_data.get(key, default)

    def remove(self, key: str) -> None:
        if key in self.context_data:
            del self.context_data[key]

    def clear(self) -> None:
        self.context_data.clear()

    def __repr__(self) -> str:
        return f"Context({self.context_data})"
