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

class ReportRequest(BaseModel):
    scores: Dict[str, int]
    strengths: List[str]
    weaknesses: List[str]

class KeyCharacteristic(BaseModel):
    title: str
    description: str
    key_points: List[str]

class StrengthMapping(BaseModel):
    strength: str
    academic_fields: List[str]
    potential_applications: str

class DevelopmentPath(BaseModel):
    area: str
    improvement_strategies: List[str]
    related_fields: str

class EducationalPath(BaseModel):
    field: str
    alignment: str
    potential_outcomes: List[str]

class CareerPath(BaseModel):
    field: str
    why_consider: str
    required_skills: List[str]
    growth_potential: str

class ProfileOverview(BaseModel):
    title: str
    description: str
    key_characteristics: List[str]

class StrengthAcademicMapping(BaseModel):
    title: str
    mappings: List[StrengthMapping]

class GrowthAreas(BaseModel):
    title: str
    description: str
    development_paths: List[DevelopmentPath]

class EducationalPathways(BaseModel):
    title: str
    paths: List[EducationalPath]

class CareerExploration(BaseModel):
    title: str
    paths: List[CareerPath]

class ReflectionQuestions(BaseModel):
    title: str
    questions: List[str]

class Report(BaseModel):
    profile_overview: ProfileOverview
    strength_academic_mapping: StrengthAcademicMapping
    growth_areas: GrowthAreas
    educational_pathways: EducationalPathways
    career_exploration: CareerExploration
    reflection_questions: ReflectionQuestions

class ReportResponse(BaseModel):
    report: Report
