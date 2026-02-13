from flask import Blueprint, request, jsonify
from models import db, Load

api = Blueprint("api", __name__)

@api.get("/loads")
def get_loads():
    loads = Load.query.order_by(Load.created_at.desc()).all()
    return jsonify([l.serialize() for l in loads]), 200

@api.post("/loads")
def create_load():
    data = request.get_json(silent=True) or {}

    if not data.get("load_id"):
        return jsonify({"error": "load_id is required"}), 400

    new_load = Load(
        load_id=data.get("load_id"),
        matricula=data.get("matricula"),
        nombre=data.get("nombre"),
        dni=data.get("dni"),
        carrier_name=data.get("carrier_name"),
    )

    db.session.add(new_load)
    db.session.commit()

    return jsonify(new_load.serialize()), 201
