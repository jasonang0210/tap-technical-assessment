from utils import singleton
from typing import List
from models.route import TeamRouteModel
from models.web import TeamWebModel, TeamDetailedWebModel, RankedGroupWebModel
from database.team import TeamDatabase

@singleton
class TeamService:
    def __init__(self):
        self.team_db = TeamDatabase()

    def post(self, teams: List[TeamRouteModel]):
        self.team_db.post_multiple(teams)

    def patch(self, name: str, team: TeamRouteModel):
        self.team_db.patch(team, {"name": name})

    def delete_all(self):
        self.team_db.delete_all()

    def fetch_all(self):
        db_models = self.team_db.fetch_all()
        return [TeamWebModel.model_validate(db_model).model_dump() for db_model in db_models]
    
    def fetch_single(self, name: str):
        db_model = self.team_db.fetch_single("name", name)
        return TeamWebModel.model_validate(db_model).model_dump()
    
    def fetch_ranked(self):
        # TODO: might need a group model, to handle for weird group numbers like 100 etc
        # but assumption for now is 1, 2
        groups = ["1", "2"]
        db_models = [{
            "group": group,
            "teams": self.team_db.fetch_ranked(group)
        } for group in groups]
        return [RankedGroupWebModel.model_validate(db_model).model_dump() for db_model in db_models]
    
    def fetch_detailed(self, name: str):
        db_model = {
            **self.fetch_single(name),
            "matches": self.team_db.fetch_team_matches(name)
        }
        return TeamDetailedWebModel.model_validate(db_model).model_dump()

            
