from typing import List, Optional
from models.route import TeamRouteModel
from models.web import TeamWebModel, TeamDetailedWebModel, RankedGroupWebModel
from database.team import TeamDatabase
from utils import append_user_id_to_team_name, remove_user_id_from_team_name

class TeamService:
    def __init__(self, user_id: int):
        self.user_id = user_id
        self.team_db = TeamDatabase(user_id)

    """
    This method is to ensure that all team names specified have not been used before
    """
    def _assert_unique_team_name(self, teams: List[TeamRouteModel], exclude: Optional[str] = None):
        # get the unique team names that come from the client
        team_names = set([team.name for team in teams])

        # get the unique team names that are within the db
        db_team_names = set([team.name for team in self.team_db.fetch_all()])
        
        if exclude:
            db_team_names.remove(exclude)
        overlapping_team_names = team_names.intersection(db_team_names)
        overlapping_team_names = [remove_user_id_from_team_name(team_name) for team_name in overlapping_team_names]
        if len(overlapping_team_names) > 0:
            overlapping_team_names_string = ", ".join(overlapping_team_names)
            raise ValueError(f"{overlapping_team_names_string} already exist as team names. The team names must be unique for identifiability.")

    def post(self, teams: List[TeamRouteModel]):
        self._assert_unique_team_name(teams)
        self.team_db.post_multiple(teams)

    def patch(self, name: str, team: TeamRouteModel):
        name = append_user_id_to_team_name(name, self.user_id)
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
        name = append_user_id_to_team_name(name, self.user_id)
        db_model = {
            **self.fetch_single(name),
            "matches": self.team_db.fetch_team_matches(name)
        }
        return TeamDetailedWebModel.model_validate(db_model).model_dump()

            
