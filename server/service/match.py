from database import Database
from utils import singleton
from typing import List, Tuple
from models.route import TeamMatchRouteModel, MatchRouteModel
from models.database import MatchDatabaseModel, TeamMatchDatabaseModel
from models.web import MatchWebModel
from models.database import db
@singleton
class MatchService:
    def __init__(self):
        self.db = Database()

    def add(self, matches: List[Tuple[TeamMatchRouteModel, TeamMatchRouteModel]]):
        for match in matches:
            # for each match, create an empty match and obtain the id
            match_id = self.db.add_single(MatchRouteModel(), MatchDatabaseModel, "id")
            first_team, second_team = match
            first_team.match_id = match_id
            second_team.match_id = match_id
            self.db.add_single(first_team, TeamMatchDatabaseModel)
            self.db.add_single(second_team, TeamMatchDatabaseModel)
            # TODO: not ideal now, might be better to consolidate and add in 1 single transaction

    def fetch_all(self):
        return self.db.fetch_all(MatchDatabaseModel, MatchWebModel)
    
    def delete_all(self):
        db.session.query(MatchDatabaseModel).delete()
        db.session.query(TeamMatchDatabaseModel).delete()
        db.session.commit()
        
    def patch(self, id: int, team_matches: Tuple[TeamMatchRouteModel, TeamMatchRouteModel]):
        for team_match in team_matches:
            team_match.match_id = id
            (
                db.session
                    .query(TeamMatchDatabaseModel)
                    .filter(TeamMatchDatabaseModel.match_id == id)
                    .filter(TeamMatchDatabaseModel.team_name == team_match.team_name)
                    .update(team_match.model_dump())
            )
        db.session.commit()