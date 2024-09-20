from models.route import RouteModelType
from models.web import WebModelType
from models.database import DatabaseModelType, db
from typing import List, Type, Generic, Dict, Union, Optional

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
    def __init__(self, db_model_class: Type[DatabaseModelType], user_id: Optional[int] = None):
        self.user_id = user_id
        self.session = db.session
        self.db_model_class = db_model_class

    def post_single(self, route_object: RouteModelType) -> DatabaseModelType:
        new_db_object = self.db_model_class(**route_object.model_dump())
        if self.user_id is not None:
            new_db_object.user_id = self.user_id
        self.session.add(new_db_object)
        self.session.commit()
        return new_db_object

    def post_multiple(self, route_objects: List[RouteModelType]) -> DatabaseModelType:
        if len(route_objects) == 0:
            raise ValueError("There needs to be at least one object to add to database.")
        print(route_objects[0].model_dump())
        new_db_objects = [
            self.db_model_class(**route_object.model_dump())
            for route_object in route_objects
        ]
        if self.user_id is not None:
            for new_db_object in new_db_objects:
                new_db_object.user_id = self.user_id
        self.session.add_all(new_db_objects)
        self.session.commit()
        return new_db_objects
    
    def patch(self, object: RouteModelType, filters: Dict[str, Union[str, int]]):
        if self.user_id is not None:
            filters["user_id"] = self.user_id
        self.session.query(self.db_model_class).filter_by(**filters).update(object.model_dump())
        self.session.commit()

    def fetch_all(self):
        query = self.session.query(self.db_model_class)
        if self.user_id is not None:
            query = query.filter(getattr(self.db_model_class, "user_id") == self.user_id)
        return query.order_by("id").all()
        
    def fetch_single(self, key: str, value: str):
        query = self.session.query(self.db_model_class).filter(getattr(self.db_model_class, key) == value)
        if self.user_id is not None:
            query = query.filter(getattr(self.db_model_class, "user_id") == self.user_id)
        return query.first()
    
    def delete_all(self):
        query = self.session.query(self.db_model_class)
        if self.user_id is not None:
            query = query.filter(getattr(self.db_model_class, "user_id") == self.user_id) 
        query.delete()
        self.session.commit()
            
