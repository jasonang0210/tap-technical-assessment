from database import Database
from utils import singleton
from typing import List, Tuple
from models.route import TeamRouteModel
from models.database import TeamDatabaseModel
from models.web import TeamWebModel

@singleton
class TeamService:
    def __init__(self):
        self.db = Database()

    def add(self, teams: List[TeamRouteModel]):
        self.db.add_all(teams, TeamDatabaseModel)

    def fetch_all(self):
        return self.db.fetch_all(TeamDatabaseModel, TeamWebModel)
    
    def fetch_single(self, name: str):
        return self.db.fetch_single(name, TeamDatabaseModel, TeamWebModel)
