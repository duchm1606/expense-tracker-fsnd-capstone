from flask import Blueprint, jsonify
from app.extensions import AuthError

bp = Blueprint('errors',__name__)

@bp.app_errorhandler(400)
def authorize_error(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": "Bad request"
    }), 400

@bp.app_errorhandler(422)
def unprocessable(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "unprocessable"
    }), 422

@bp.app_errorhandler(404)
def resource_not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "resource not found"
    }), 404

@bp.app_errorhandler(AuthError)
def authorize_error(error):
    return jsonify({
        "success": False,
        "error": 403,
        "message": "Permission denied"
    }), 403

@bp.app_errorhandler(500)
def resource_not_found(error):
    return jsonify({
        "success": False,
        "error": 500,
        "message": "Internal server error"
    }), 500