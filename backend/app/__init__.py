# flask module
from flask import Flask
# Other Modules
import os

def create_app(debug: bool = False):
    # Check if debug environment variable was passed
    FLASK_DEBUG = os.environ.get("FLASK_DEBUG", False)
    if FLASK_DEBUG:
        debug = FLASK_DEBUG

    # Create the Flask application instance
    app = Flask(__name__)

    # Set current_app context
    app.app_context().push()

    if debug == True:
        print('Running on Dev')
        from app.config.dev import DevConfig

        app.config.from_object(DevConfig)
    else:
        print('Running on Prod')
        from app.config.prod import ProdConfig

        app.config.from_object(ProdConfig)

    # Initialize extensions
    from app.extensions import db, cors, setup_db

    # Setup postgreSQL database
    setup_db(app)

    # Setup Cross-Origin Resource Sharing
    cors.init_app(app)

    # Import all models and Create database tables
    from app import models
    db.create_all()

    # Register restAPI for routes 
    # from app.routes import api_bp, pages_bp, auth_bp

    return app