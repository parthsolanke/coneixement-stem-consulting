from dotenv import load_dotenv
import os

env_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
MODEL = os.environ.get("MODEL", "gemini-1.5-flash-8b")
ENV = os.environ.get("ENV", "development").lower().strip()

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

if ENV not in ["development", "production"]:
    raise ValueError(f"ENV must be either 'development' or 'production', got '{ENV}'")

ALLOWED_ORIGINS = ["*"]
if ENV == "production":
    origins = os.environ.get("ALLOWED_ORIGINS", "")
    if not origins:
        raise ValueError("ALLOWED_ORIGINS must be set in production environment")
    ALLOWED_ORIGINS = [origin.strip() for origin in origins.split(",") if origin.strip()]
    
    for origin in ALLOWED_ORIGINS:
        if not (origin.startswith('http://') or origin.startswith('https://')):
            raise ValueError(f"Invalid origin URL format: {origin}")

    if not ALLOWED_ORIGINS:
        raise ValueError("ALLOWED_ORIGINS cannot be empty in production")