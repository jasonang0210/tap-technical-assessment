from database.base import Database
from utils import singleton
from models.route import TeamMatchRouteModel
from models.database import TeamMatchDatabaseModel

@singleton
class TeamMatchDatabase(Database[TeamMatchRouteModel, TeamMatchDatabaseModel]):
    def __init__(self):
        super().__init__(TeamMatchDatabaseModel)
