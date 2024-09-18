from database.base import Database
from utils import singleton
from models.route import MatchRouteModel
from models.database import MatchDatabaseModel

@singleton
class MatchDatabase(Database[MatchRouteModel, MatchDatabaseModel]):
    def __init__(self):
        super().__init__(MatchDatabaseModel)