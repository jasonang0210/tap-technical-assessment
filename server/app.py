from flask import request, jsonify, Flask
from models.route import TeamRouteModel, TeamMatchRouteModel
from service.match import MatchService
from service.team import TeamService
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from models.database import db, migrate

app = Flask(__name__)
CORS(app, origins=['http://localhost:3001'])  # Allow CORS for this origin

load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')

db.init_app(app)
migrate.init_app(app, db)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)

team_service = TeamService()
match_service = MatchService()

@app.errorhandler(ValueError)
def handle_value_error(error):
    response = {
        "error": "ValueError",
        "message": str(error)
    }
    return jsonify(response), 400

# TEAMS

@app.route("/teams", methods=['POST'])
def post_teams():
    data = request.get_json()["data"]
    teams = TeamRouteModel.parse_multiple(data)
    team_service.post(teams)
    return ""

@app.route("/teams", methods=['GET'])
def fetch_teams():
    ranked = request.args.get('ranked', default='false', type=str)
    if ranked == 'true':
        return jsonify(team_service.fetch_ranked())
    return jsonify(team_service.fetch_all())

@app.route("/teams/<name>", methods=['GET'])
def fetch_team(name):
    object = team_service.fetch_detailed(name)
    return jsonify(object)

@app.route("/teams/<name>", methods=['PATCH'])
def patch_team(name):
    data = request.get_json()["data"]
    team = TeamRouteModel.parse_single(data)
    team_service.patch(name, team)
    return ""

# MATCHES

@app.route("/matches", methods=['POST'])
def post_matches():
    data = request.get_json()["data"]
    team_matches = TeamMatchRouteModel.parse_multiple(data)
    match_service.post(team_matches)
    return ""

@app.route("/matches/<id>", methods=['PATCH'])
def patch_match(id):
    data = request.get_json()["data"]
    team_match = TeamMatchRouteModel.parse_single(data)
    match_service.patch(id, team_match)
    return ""

@app.route("/matches", methods=['GET'])
def fetch_matches():
    objects = match_service.fetch_all()
    return jsonify(objects)

# CLEAR ALL

@app.route("/clear_database", methods=['POST'])
def clear_database():
    team_service.delete_all()
    match_service.delete_all()
    return ""