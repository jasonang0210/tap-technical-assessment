from flask import Flask, request, jsonify
from models.route import TeamRouteModel, TeamMatchRouteModel
from models.database import TeamDatabaseModel, MatchDatabaseModel
from service.match import MatchService
from service.team import TeamService
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3001')  # Allow CORS for this origin

team_service = TeamService()
match_service = MatchService()

@app.route("/register", methods=['POST'])
def post_teams():
    data = request.get_json()["data"]
    teams = TeamRouteModel.parse_multiple(data)
    team_service.add(teams)
    return ""

@app.route("/teams", methods=['GET'])
def fetch_teams():
    objects = team_service.fetch_all()
    return jsonify(objects)

@app.route("/teams/<name>", methods=['GET'])
def fetch_team(name):
    object = team_service.fetch_single(name)
    return jsonify(object)

@app.route("/record", methods=['POST'])
def post_matches():
    data = request.get_json()["data"]
    team_matches = TeamMatchRouteModel.parse_multiple(data)
    match_service.add(team_matches)
    return ""

@app.route("/matches", methods=['GET'])
def fetch_matches():
    objects = match_service.fetch_all()
    return jsonify(objects)