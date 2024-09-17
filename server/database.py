from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.route import RouteModelType
from models.web import WebModelType
from models.database import DatabaseModel, DatabaseModelType
from typing import List, Type, Optional
from utils import singleton

@singleton
class Database:
    def __init__(self):
        self.engine = create_engine("sqlite:///test.db", echo=True)
        self.SessionFactory = sessionmaker(self.engine)
        DatabaseModel.metadata.create_all(self.engine)

    def add_single(self, object: RouteModelType, db_model_class: Type[DatabaseModelType], return_field: Optional[str] = None) -> str:
        with self.SessionFactory() as session:
            new_db_object = db_model_class(**object.model_dump())
            session.add(new_db_object)
            session.commit()
            return getattr(new_db_object, return_field) if return_field is not None else None
        
    def add_all(self, objects: List[RouteModelType], db_model_class: Type[DatabaseModelType]):
        if len(objects) == 0:
            raise ValueError("There needs to be at least one object to add to database.")
        with self.SessionFactory() as session:
            new_db_objects = [db_model_class(**object.model_dump()) for object in objects]
            session.add_all(new_db_objects)
            session.commit()

    def fetch_all(self, db_model_class: Type[DatabaseModelType], web_model_class: Type[WebModelType]) -> List[dict]:
        with self.SessionFactory() as session:
            objects = session.query(db_model_class).all()
            return [web_model_class.model_validate(object).model_dump() for object in objects]
        
    def fetch_single(self, key: str, db_model_class: Type[DatabaseModelType], web_model_class: Type[WebModelType]) -> List[dict]:
        with self.SessionFactory() as session:
            object = session.query(db_model_class).get(key)
            return web_model_class.model_validate(object).model_dump()
