from pydantic import BaseModel, ConfigDict
from typing import List, TypeVar

class WebModel(BaseModel):
    pass

class TeamWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)
    
    name: str
    registration_date: str
    group: str

class TeamMatchWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)

    team_name: str
    goals: int
class MatchWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    team_matches: List[TeamMatchWebModel]

class RankingWebModel(TeamWebModel):
    model_config = ConfigDict(from_attributes=True)

    total_points: int
    total_goals: int
    total_alt_points: int

class MatchDetailedWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)
    
    team_goals: int
    opponent_goals: int
    outcome: str
class TeamDetailedWebModel(TeamWebModel):
    model_config = ConfigDict(from_attributes=True)

    matches: List[MatchDetailedWebModel]


WebModelType = TypeVar('WebModelType', bound=WebModel)
