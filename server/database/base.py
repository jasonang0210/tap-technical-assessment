from models.route import RouteModelType
from models.web import WebModelType
from models.database import DatabaseModelType, db
from typing import List, Type, Generic, Dict, Union
from utils import singleton

"""
Root Database class.
This should handle for basic database actions, like POST/PATCH/GET[ALL/SINGLE]/DELETE
Further complex queries should be handled in individual inherited Database class

Note: the Database class should only handle database operations
It should NOT handle validations, pre/post transformations etc
Such operations should be handled at the service layer

In general, the operations should receive a dict/list of dicts for inputs (prior validation using pydantic should be done via RouteModel)
return results should be of DatabaseModelType. This is to ensure that the database layer is used purely for database ops
"""

class Database(Generic[RouteModelType, DatabaseModelType]):
    def __init__(self, db_model_class: Type[DatabaseModelType]):
        self.session = db.session
        self.db_model_class = db_model_class

    def post_single(self, object: RouteModelType) -> DatabaseModelType:
        new_db_object = self.db_model_class(**object.model_dump())
        self.session.add(new_db_object)
        self.session.commit()
        return new_db_object

    def post_multiple(self, objects: List[RouteModelType]) -> DatabaseModelType:
        if len(objects) == 0:
            raise ValueError("There needs to be at least one object to add to database.")
        new_db_objects = [self.db_model_class(**object.model_dump()) for object in objects]
        self.session.add_all(new_db_objects)
        self.session.commit()
        return new_db_objects
    
    def patch(self, object: RouteModelType, filters: Dict[str, Union[str, int]]):
        self.session.query(self.db_model_class).filter(**filters).update(object.model_dump)
        self.session.commit()

    def fetch_all(self):
        return self.session.query(self.db_model_class).all()
        
    def fetch_single(self, key: str, value: str):
        return self.session.query(self.db_model_class).filter(getattr(self.db_model_class, key) == value).first()
    
    def delete_all(self):
        self.session.query(self.db_model_class).delete()
        self.session.commit()
            
