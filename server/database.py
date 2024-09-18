from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.route import RouteModelType
from models.web import WebModelType
from models.database import DatabaseModel, DatabaseModelType, db
from typing import List, Type, Optional
from utils import singleton

@singleton
class Database:
    def add_single(self, object: RouteModelType, db_model_class: Type[DatabaseModelType], return_field: Optional[str] = None) -> str:
        new_db_object = db_model_class(**object.model_dump())
        db.session.add(new_db_object)
        db.session.commit()
        return getattr(new_db_object, return_field) if return_field is not None else None
        
    def add_all(self, objects: List[RouteModelType], db_model_class: Type[DatabaseModelType]):
        if len(objects) == 0:
            raise ValueError("There needs to be at least one object to add to database.")
        new_db_objects = [db_model_class(**object.model_dump()) for object in objects]
        db.session.add_all(new_db_objects)
        db.session.commit()

    def fetch_all(self, db_model_class: Type[DatabaseModelType], web_model_class: Type[WebModelType]) -> List[dict]:
        objects = db.session.query(db_model_class).all()
        return [web_model_class.model_validate(object).model_dump() for object in objects]
        
    def fetch_single(self, key: str, value: str, db_model_class: Type[DatabaseModelType], web_model_class: Type[WebModelType]) -> List[dict]:
        object = db.session.query(db_model_class).filter(getattr(db_model_class, key) == value).first()
        return web_model_class.model_validate(object).model_dump()
            
