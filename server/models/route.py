from pydantic import BaseModel, field_validator, model_serializer
from typing import List, TypeVar, Tuple, Optional
from constants import INVALID_TEAM_ERROR, INVALID_MATCH_ERROR, INVALID_DATE_ERROR, INVALID_GROUP_ERROR
from utils import swap_date_month, append_user_id_to_team_name
import re
class RouteModel(BaseModel):
    pass

class AuthenticatedRouteModel(BaseModel):
    user_id: int

class TeamRouteModel(AuthenticatedRouteModel):
    name: str
    registration_date: str
    group: str

    @field_validator('name')
    @classmethod
    def manipulate_team_name(cls, name, values):
        return append_user_id_to_team_name(name, values.data.get("user_id"))

    @field_validator('registration_date')
    @classmethod
    def must_be_valid_date(cls, registration_date: str) -> str:
        pattern = r"^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])$"
        if not re.match(pattern, registration_date):
            raise ValueError(INVALID_DATE_ERROR)
        
        # store the date as MM/DD so that simple string ordering would work
        return swap_date_month(registration_date)
    
    @field_validator('group')
    @classmethod
    def must_be_valid_group(cls, group: str) -> str:
        if group not in ["1", "2"]:
            raise ValueError(INVALID_GROUP_ERROR)
        return group

    @classmethod
    def parse_single(cls, data: str, user_id: int) -> "TeamRouteModel":
        parts = data.split(" ")
        if len(parts) != 3:
            raise ValueError(INVALID_TEAM_ERROR)

        name, registration_date, group = parts
        return cls(
            name=name,
            registration_date=registration_date,
            group=group,
            user_id=user_id
        )

    @classmethod
    def parse_multiple(cls, multiple: str, user_id: int) -> List["TeamRouteModel"]:
        return [cls.parse_single(single, user_id) for single in multiple.split("\n")]
    
class TeamMatchRouteModel(AuthenticatedRouteModel):
    team_name: str
    goals: int
    match_id: Optional[int]

    @field_validator('team_name')
    @classmethod
    def manipulate_team_name(cls, team_name, values):
        return append_user_id_to_team_name(team_name, values.data.get("user_id"))

    @field_validator('goals')
    @classmethod
    def must_be_positive_goal(cls, goals: int) -> int:
        if goals < 0:
            raise ValueError(INVALID_GROUP_ERROR)
        return goals

    @classmethod
    def parse_single(cls, data: str, user_id: int) -> Tuple["TeamMatchRouteModel", "TeamMatchRouteModel"]:
        parts = data.split(" ")
        if len(parts) != 4:
            raise ValueError(INVALID_MATCH_ERROR)

        return (
            cls(
                team_name=parts[0],
                goals=int(parts[2]),
                match_id=None,
                user_id=user_id
            ),
            cls(
                team_name=parts[1],
                goals=int(parts[3]),
                match_id=None,
                user_id=user_id
            )
        )

    @classmethod
    def parse_multiple(cls, multiple: str, user_id: int) -> List[Tuple["TeamMatchRouteModel", "TeamMatchRouteModel"]]:
        return [cls.parse_single(single, user_id) for single in multiple.split("\n")]
    
class MatchRouteModel(AuthenticatedRouteModel):
    # id is autoincremented, so there are no fields
    pass

class UserRouteModel(RouteModel):
    username: str
    password: str

RouteModelType = TypeVar('RouteModelType', bound=RouteModel)
