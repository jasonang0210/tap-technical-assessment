from flask import request, jsonify, Flask
from models.route import TeamRouteModel, TeamMatchRouteModel, UserRouteModel
from service.match import MatchService
from service.team import TeamService
from service.user import BaseService
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from models.database import db, migrate
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required

load_dotenv()

app = Flask(__name__)

allowed_origin = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3001')
CORS(app, origins=allowed_origin)  # Allow CORS for this origin

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///default.db')

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

db.init_app(app)
migrate.init_app(app, db)

with app.app_context():
    db.create_all()

base_service = BaseService()

# LOGIN

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        raise ValueError("Please provide login details.")
    token = base_service.login(UserRouteModel(username=data["username"], password=data["password"])) 
    return jsonify({"token": token})
    
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if not data:
        raise ValueError("Please provide signup details.")
    base_service.signup(UserRouteModel(username=data["username"], password=data["password"])) 
    token = base_service.login(UserRouteModel(username=data["username"], password=data["password"])) 
    return jsonify({"token": token})

# TEAMS

@app.route("/teams", methods=['POST'])
@jwt_required()
def post_teams():
    user_id = get_jwt_identity()
    data = request.get_json()["data"]
    teams = TeamRouteModel.parse_multiple(data, user_id)
    team_service = TeamService(user_id)
    team_service.post(teams)
    return ""

@app.route("/teams", methods=['GET'])
@jwt_required()
def fetch_teams():
    user_id = get_jwt_identity()
    ranked = request.args.get('ranked', default='false', type=str)
    team_service = TeamService(user_id)
    if ranked == 'true':
        return jsonify(team_service.fetch_ranked())
    return jsonify(team_service.fetch_all())

@app.route("/teams/<name>", methods=['GET'])
@jwt_required()
def fetch_team(name):
    user_id = get_jwt_identity()
    team_service = TeamService(user_id)
    object = team_service.fetch_detailed(name)
    return jsonify(object)

@app.route("/teams/<name>", methods=['PATCH'])
@jwt_required()
def patch_team(name):
    user_id = get_jwt_identity()
    data = request.get_json()["data"]
    team = TeamRouteModel.parse_single(data, user_id)
    team_service = TeamService(user_id)
    team_service.patch(name, team)
    return ""

# MATCHES

@app.route("/matches", methods=['POST'])
@jwt_required()
def post_matches():
    user_id = get_jwt_identity()
    data = request.get_json()["data"]
    team_matches = TeamMatchRouteModel.parse_multiple(data, user_id)
    match_service = MatchService(user_id)
    match_service.post(team_matches)
    return ""

@app.route("/matches/<id>", methods=['PATCH'])
@jwt_required()
def patch_match(id):
    user_id = get_jwt_identity()
    data = request.get_json()["data"]
    team_match = TeamMatchRouteModel.parse_single(data, user_id)
    match_service = MatchService(user_id)
    match_service.patch(id, team_match)
    return ""

@app.route("/matches", methods=['GET'])
@jwt_required()
def fetch_matches():
    user_id = get_jwt_identity()
    match_service = MatchService(user_id)
    objects = match_service.fetch_all()
    return jsonify(objects)

# CLEAR ALL

@app.route("/clear_database", methods=['POST'])
@jwt_required()
def clear_database():
    user_id = get_jwt_identity()
    team_service = TeamService(user_id)
    match_service = MatchService(user_id)
    team_service.delete_all()
    match_service.delete_all()
    return ""

# ERROR HANDLERS

@app.errorhandler(ValueError)
def handle_value_error(error):
    error = str(error)
    pydantic_error = "Value error, "
    start = error.find(pydantic_error)
    end = error.find("[type=value_error")
    if start != -1 and end != -1:
        start += len(pydantic_error)
        error = error[start:end]
    response = {
        "error": "ValueError",
        "message": error
    }
    return jsonify(response), 400

@app.errorhandler(500)
def internal_error(error):
    response = {
        "error": "ServerError",
        "message": str(error)
    }
    return jsonify(response), 500