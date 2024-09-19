from pydantic import BaseModel, field_validator
from typing import List, TypeVar, Tuple, Optional
from constants import INVALID_TEAM_ERROR, INVALID_MATCH_ERROR, INVALID_DATE_ERROR, INVALID_GROUP_ERROR
from utils import swap_date_month
import re
class RouteModel(BaseModel):
    pass

class TeamRouteModel(RouteModel):
    name: str
    registration_date: str
    group: str

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
    def parse_single(cls, data: str) -> "TeamRouteModel":
        parts = data.split(" ")
        if len(parts) != 3:
            raise ValueError(INVALID_TEAM_ERROR)

        name, registration_date, group = parts
        return cls(
            name=name,
            registration_date=registration_date,
            group=group
        )

    @classmethod
    def parse_multiple(cls, multiple: str) -> List["TeamRouteModel"]:
        return [cls.parse_single(single) for single in multiple.split("\n")]
    
class TeamMatchRouteModel(RouteModel):
    team_name: str
    goals: int
    match_id: Optional[int]

    @field_validator('goals')
    @classmethod
    def must_be_positive_goal(cls, goals: int) -> int:
        if goals < 0:
            raise ValueError(INVALID_GROUP_ERROR)
        return goals

    @classmethod
    def parse_single(cls, data: str) -> Tuple["TeamMatchRouteModel", "TeamMatchRouteModel"]:
        parts = data.split(" ")
        if len(parts) != 4:
            raise ValueError(INVALID_MATCH_ERROR)

        return (
            cls(
                team_name=parts[0],
                goals=int(parts[2]),
                match_id=None
            ),
            cls(
                team_name=parts[1],
                goals=int(parts[3]),
                match_id=None
            )
        )

    @classmethod
    def parse_multiple(cls, multiple: str) -> List[Tuple["TeamMatchRouteModel", "TeamMatchRouteModel"]]:
        return [cls.parse_single(single) for single in multiple.split("\n")]
    
class MatchRouteModel(RouteModel):
    # id is autoincremented, so there are no fields
    pass

RouteModelType = TypeVar('RouteModelType', bound=RouteModel)
