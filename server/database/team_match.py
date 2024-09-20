from database.base import Database
from models.route import TeamMatchRouteModel
from models.database import TeamMatchDatabaseModel
class TeamMatchDatabase(Database[TeamMatchRouteModel, TeamMatchDatabaseModel]):
    def __init__(self, user_id: int):
        super().__init__(TeamMatchDatabaseModel, user_id)