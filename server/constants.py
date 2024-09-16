from models.database import DatabaseModelType, TeamDatabaseModel
from models.route import RouteModelType, TeamRouteModel
from models.web import WebModelType, TeamWebModel
from typing import Type, Dict

ROUTE_TO_DATABASE_MAPPING: Dict[Type[RouteModelType], Type[DatabaseModelType]] = {
    TeamRouteModel: TeamDatabaseModel,
}

DATABASE_TO_WEB_MAPPING: Dict[Type[DatabaseModelType], Type[WebModelType]] = {
    TeamDatabaseModel: TeamWebModel,
}
