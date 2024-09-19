from utils import singleton
from typing import List, Tuple
from models.route import TeamMatchRouteModel, MatchRouteModel
from models.web import MatchWebModel
from database.match import MatchDatabase
from database.team_match import TeamMatchDatabase
from database.team import TeamDatabase

@singleton
class MatchService:
    def __init__(self):
        self.match_db = MatchDatabase()
        self.team_match_db = TeamMatchDatabase()
        self.team_db = TeamDatabase()

    def _assert_valid_team(self, matches: List[Tuple[TeamMatchRouteModel, TeamMatchRouteModel]]):
        teams_in_matches = set([team_match.team_name for match in matches for team_match in match])
        db_team_names = set([team.name for team in self.team_db.fetch_all()])
        unknown_teams = teams_in_matches.difference(db_team_names)
        if len(unknown_teams) > 0:
            unknown_teams_string = ", ".join(unknown_teams)
            raise ValueError(f"{unknown_teams_string} are invalid team name(s). Ensure that the team exists before assigning a match to it.")
        
    def _assert_unique_teams(self, matches: List[Tuple[TeamMatchRouteModel, TeamMatchRouteModel]]):
        teams_tuple = set([tuple(sorted(map(lambda x: x.team_name, match))) for match in matches])
        db_teams_tuple = set([tuple(sorted(map(lambda x: x.team_name, match.team_matches))) for match in self.match_db.fetch_all()])
        overlapping_team_matches = teams_tuple.intersection(db_teams_tuple)
        if len(overlapping_team_matches) > 0:
            overlapping_team_matches_string = ", ".join(f'({x}, {y})' for x, y in overlapping_team_matches)
            raise ValueError(f"{overlapping_team_matches_string} have played a match before. Each team should only play another team once.")
        
    def _assert_team_unchanged(self, id: int, match: Tuple[TeamMatchRouteModel, TeamMatchRouteModel]):
        team_in_match = set([team_match.team_name for team_match in match])
        db_team_in_match = set([team_match.team_name for team_match in self.match_db.fetch_single("id", id).team_matches])
        if len(team_in_match.symmetric_difference(db_team_in_match)) > 0:
            raise ValueError(f"You are not allowed to edit the team name in a match. You are only allowed to edit the goals.")

    def post(self, matches: List[Tuple[TeamMatchRouteModel, TeamMatchRouteModel]]):
        self._assert_valid_team(matches)
        self._assert_unique_teams(matches)
        for match in matches:
            match_db_model = self.match_db.post_single(MatchRouteModel())
            for team_match in match:
                team_match.match_id = match_db_model.id
            self.team_match_db.post_multiple(match)

    def patch(self, id: int, match: Tuple[TeamMatchRouteModel, TeamMatchRouteModel]):
        self._assert_team_unchanged(id, match)
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
