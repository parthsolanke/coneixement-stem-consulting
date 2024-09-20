# server.py
from fastapi import FastAPI
from quiz.routes import app as quiz_app

app = FastAPI()

app.mount("/api", quiz_app)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the main API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
