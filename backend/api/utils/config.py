from dotenv import load_dotenv
import os

env_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = os.getenv("MODEL", "gemini-1.5-flash")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")
