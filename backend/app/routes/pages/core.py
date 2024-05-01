# Api Handling
from flask import Blueprint, jsonify
import json

core_bp = Blueprint("core", __name__, url_prefix="/")


@core_bp.route("/get", methods=['GET'])
def home_route():
    return jsonify({
        'msg': 'hello'
    }, 200)