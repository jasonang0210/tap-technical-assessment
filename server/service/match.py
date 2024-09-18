from utils import singleton
from typing import List, Tuple
from models.route import TeamMatchRouteModel, MatchRouteModel
from models.web import MatchWebModel
from database.match import MatchDatabase
from database.team_match import TeamMatchDatabase

@singleton
class MatchService:
    def __init__(self):
        self.match_db = MatchDatabase()
        self.team_match_db = TeamMatchDatabase()

    def post(self, matches: List[Tuple[TeamMatchRouteModel, TeamMatchRouteModel]]):
        for match in matches:
            match_db_model = self.match_db.post_single(MatchRouteModel())
            for team_match in match:
                team_match.match_id = match_db_model.id
            self.team_match_db.post_multiple(match)

    def patch(self, id: int, match: Tuple[TeamMatchRouteModel, TeamMatchRouteModel]):
        for team_match in match:
            team_match.match_id = id
            self.team_match_db.patch(team_match, {"match_id": id, "team_name": team_match.team_name})

    def delete_all(self):
        self.match_db.delete_all()
        self.team_match_db.delete_all()

    def fetch_all(self):
        db_models = self.match_db.fetch_all()
        return [MatchWebModel.model_validate(db_model).model_dump() for db_model in db_models]
    
    def fetch_single(self, id: str):
        db_model = self.match_db.fetch_single("id", id)
        return MatchWebModel.model_validate(db_model).model_dump()
