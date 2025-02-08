import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from quiz.routes import app as quiz_app
from report.routes import app as report_app

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/api/quiz", quiz_app, name="quiz")
app.mount("/api/report", report_app, name="report")

def run():
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000,
        loop="auto",
    )

if __name__ == "__main__":
    run()
