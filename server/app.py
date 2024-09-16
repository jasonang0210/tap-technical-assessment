from flask import Flask, request, jsonify
from models.route import TeamRouteModel, TeamMatchRouteModel
from models.database import TeamDatabaseModel
from database import Database
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3001')  # Allow CORS for this origin

@app.route("/register", methods=['POST'])
def register_teams():
    data = request.get_json()["data"]
    teams = TeamRouteModel.parse_multiple(data)
    db = Database()
    db.add(teams)
    return ""

@app.route("/teams", methods=['GET'])
def fetch_teams():
    db = Database()
    objects = db.fetch_all(TeamDatabaseModel)
    return jsonify(objects)

@app.route("/teams/<name>", methods=['GET'])
def fetch_team(name):
    db = Database()
    object = db.fetch_single(TeamDatabaseModel, name)
    return jsonify(object)