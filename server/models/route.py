from pydantic import BaseModel
from typing import List, TypeVar, Tuple, Optional

class RouteModel(BaseModel):
    pass

class TeamRouteModel(RouteModel):
    name: str
    registration_date: str
    group: str

    @classmethod
    def parse_single(cls, data: str) -> "TeamRouteModel":
        parts = data.split(" ")
        assert len(parts) == 3

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
    match_id: Optional[str]

    @classmethod
    def parse_single(cls, data: str) -> Tuple["TeamMatchRouteModel", "TeamMatchRouteModel"]:
        parts = data.split(" ")
        assert len(parts) == 4

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
