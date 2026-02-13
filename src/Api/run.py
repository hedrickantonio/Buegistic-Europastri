from flask import Flask
from flask_cors import CORS
from models import db
from routes import api
import os

app = Flask(__name__)

# SQLite file inside src/Api/
db_path = os.path.join(os.path.dirname(__file__), "app.db")
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app, resources={r"/api/*": {"origins": "*"}})

db.init_app(app)
app.register_blueprint(api, url_prefix="/api")

@app.get("/health")
def health():
    return {"status": "ok"}, 200

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
