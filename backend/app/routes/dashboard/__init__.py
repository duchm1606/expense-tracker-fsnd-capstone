# Flask modules
from flask import Blueprint
from app.util import errors_bp
# Blueprint modules
from .budgets import budgets_bp

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")

dashboard_bp.register_blueprint(budgets_bp)