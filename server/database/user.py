from database.base import Database
from models.route import UserRouteModel
from models.database import UserDatabaseModel

class UserDatabase(Database[UserRouteModel, UserDatabaseModel]):
    def __init__(self):
        super().__init__(UserDatabaseModel)