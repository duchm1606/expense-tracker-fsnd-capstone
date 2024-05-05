# Other modules
import os
from pathlib import Path
from dotenv import load_dotenv #type: ignore

BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE_PATH = BASE_DIR / ".env"
load_dotenv(ENV_FILE_PATH)

# Flask
SECRET_KEY = os.environ.get("SECRET_KEY", "YOUR-FALLBACK-SECRET-KEY")
DATABASE_URI = "sqlite:///database.db"
AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN') 
ALGORITHMS = os.environ.get('ALGORITHMS') 
API_AUDIENCE = os.environ.get('API_AUDIENCE') 


class ProdConfig:
    # Flask
    TESTING = True
    DEBUG = True
    TEMPLATES_AUTO_RELOAD = True
    STATIC_AUTO_RELOAD = True
    EXPLAIN_TEMPLATE_LOADING = False
    SECRET_KEY = SECRET_KEY
    # Database
    SQLALCHEMY_DATABASE_URI = DATABASE_URI