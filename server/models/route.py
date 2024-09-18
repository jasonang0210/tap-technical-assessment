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
        if len(parts) != 3:
            raise ValueError("Invalid format. Ensure that input data is in the format '<team_name> <registration_date> <group_number>'")

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
        if len(parts) != 4:
            raise ValueError("Invalid format. Ensure that input data is in the format '<teamA_name> <teamB_name> <teamA_goals> <teamB_goals>'")

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
