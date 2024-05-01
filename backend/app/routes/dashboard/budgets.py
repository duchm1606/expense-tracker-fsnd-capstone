# Api Handling
from flask import Blueprint, jsonify
import json

budgets_bp = Blueprint("core", __name__, url_prefix="/budgets")


@budgets_bp.route("/get", methods=['GET'])
def home_route():
    return jsonify({
        'msg': 'hello'
    }, 200)