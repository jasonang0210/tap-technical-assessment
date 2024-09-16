from flask import Flask, request, jsonify
from models.route import TeamRouteModel, TeamMatchRouteModel
from models.database import TeamDatabaseModel
from database import Database

app = Flask(__name__)

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
    objects = db.get(TeamDatabaseModel)
    return jsonify(objects)
