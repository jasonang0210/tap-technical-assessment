from database import Database
from utils import singleton
from typing import List, Tuple
from models.route import TeamMatchRouteModel, MatchRouteModel
from models.database import MatchDatabaseModel, TeamMatchDatabaseModel
from models.web import MatchWebModel

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