from flask import Blueprint

bp = Blueprint('errors',__name__)

@bp.app_errorhandler(404)
def handle404(error):
    return '404 handled'

@bp.app_errorhandler(500)
def handle404(error):
    return '500 handled'