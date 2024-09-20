from database.base import Database
from models.route import MatchRouteModel
from models.database import MatchDatabaseModel

class MatchDatabase(Database[MatchRouteModel, MatchDatabaseModel]):
    def __init__(self, user_id: int):
        super().__init__(MatchDatabaseModel, user_id)

    