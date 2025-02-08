import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.middleware.error_handlers import event_loop_error_handler
from api.quiz.routes import app as quiz_app
from api.report.routes import app as report_app

app = FastAPI(
    title="Career Guidance API",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.middleware("http")(event_loop_error_handler)

app.mount("/api/quiz", quiz_app)
app.mount("/api/report", report_app)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)