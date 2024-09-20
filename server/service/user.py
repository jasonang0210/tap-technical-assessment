from models.route import UserRouteModel
from database.user import UserDatabase
from flask_jwt_extended import create_access_token

class BaseService:
    def __init__(self):
        self.user_db = UserDatabase()

    def login(self, user: UserRouteModel) -> str:
        # check to see if user exists in database
        user_db_model = self.user_db.fetch_single("username", user.username)
        if user_db_model is None or user_db_model.password != user.password:
            raise ValueError("Username or password is incorrect. Please try again.")    
        return create_access_token(identity=user_db_model.id)
    
    def signup(self, user: UserRouteModel):
        user_db_model = self.user_db.fetch_single("username", user.username)
        if user_db_model is not None:
            raise ValueError("Username is already taken. Please choose another username.")
        self.user_db.post_single(user)


            
