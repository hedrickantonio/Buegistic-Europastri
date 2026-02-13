from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Load(db.Model):
    __tablename__ = "loads"

    id = db.Column(db.Integer, primary_key=True)
    load_id = db.Column(db.String(100), nullable=False)
    matricula = db.Column(db.String(100))
    nombre = db.Column(db.String(100))
    dni = db.Column(db.String(50))
    carrier_name = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "load_id": self.load_id,
            "matricula": self.matricula,
            "nombre": self.nombre,
            "dni": self.dni,
            "carrier_name": self.carrier_name,
            "created_at": self.created_at
        }
