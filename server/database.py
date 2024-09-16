from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.route import RouteModelType
from models.database import DatabaseModel, DatabaseModelType
from constants import ROUTE_TO_DATABASE_MAPPING, DATABASE_TO_WEB_MAPPING
from typing import List, Type

def singleton(cls):
    instances = {}
    def getinstance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return getinstance

@singleton
class Database:
    def __init__(self):
        self.engine = create_engine("sqlite:///test.db", echo=True)
        self.SessionFactory = sessionmaker(self.engine)
        DatabaseModel.metadata.create_all(self.engine)
        
    def add(self, objects: List[RouteModelType]):
        if len(objects) == 0:
            raise ValueError("There needs to be at least one object to add to database.")
        with self.SessionFactory() as session:
            db_model_class = ROUTE_TO_DATABASE_MAPPING[type(objects[0])]
            new_db_objects = [db_model_class(**object.model_dump()) for object in objects]
            session.add_all(new_db_objects)
            session.commit()

    def fetch_all(self, db_model_class: Type[DatabaseModelType]) -> List[dict]:
        with self.SessionFactory() as session:
            objects = session.query(db_model_class).all()
            web_model_class = DATABASE_TO_WEB_MAPPING[db_model_class]
            return [web_model_class.model_validate(object).model_dump() for object in objects]
        
    def fetch_single(self, db_model_class: Type[DatabaseModelType], key: str) -> List[dict]:
        with self.SessionFactory() as session:
            object = session.query(db_model_class).get(key)
            web_model_class = DATABASE_TO_WEB_MAPPING[db_model_class]
            return web_model_class.model_validate(object).model_dump()
