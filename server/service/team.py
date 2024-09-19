from utils import singleton
from typing import List, Optional
from models.route import TeamRouteModel
from models.web import TeamWebModel, TeamDetailedWebModel, RankedGroupWebModel
from database.team import TeamDatabase

@singleton
class TeamService:
    def __init__(self):
        self.team_db = TeamDatabase()

    def _assert_unique_team_name(self, teams: List[TeamRouteModel], exclude: Optional[str] = None):
        team_names = set([team.name for team in teams])
        db_team_names = set([team.name for team in self.team_db.fetch_all()])
        if exclude:
            db_team_names.remove(exclude)
        overlapping_team_names = team_names.intersection(db_team_names)
        if len(overlapping_team_names) > 0:
            overlapping_team_names_string = ", ".join(overlapping_team_names)
            raise ValueError(f"{overlapping_team_names_string} already exist as team names. The team names must be unique for identifiability.")

    def post(self, teams: List[TeamRouteModel]):
        self._assert_unique_team_name(teams)
        self.team_db.post_multiple(teams)

    def patch(self, name: str, team: TeamRouteModel):
        self._assert_unique_team_name([team], exclude=name)
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

            
