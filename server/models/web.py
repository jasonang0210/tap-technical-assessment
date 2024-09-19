from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import List, TypeVar, Optional
from utils import swap_date_month

class WebModel(BaseModel):
    pass

class TeamWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)
    
    name: str
    registration_date: str
    group: str
    total_points: Optional[int] = Field(default=None) 
    total_goals: Optional[int] = Field(default=None)
    total_alt_points: Optional[int] = Field(default=None)

    @field_validator('registration_date')
    @classmethod
    def format_date(cls, registration_date: str) -> str:
        # unswap the date to DD/MM so that the user will view it in the original format
        return swap_date_month(registration_date)

class TeamMatchWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)

    team_name: str
    goals: int
class MatchWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    team_matches: List[TeamMatchWebModel]

class RankedGroupWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)
    
    group: str
    teams: List[TeamWebModel]

class MatchDetailedWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)
    
    team_goals: int
    opponent_team_name: str
    opponent_goals: int
    outcome: str
class TeamDetailedWebModel(TeamWebModel):
    model_config = ConfigDict(from_attributes=True)

    matches: List[MatchDetailedWebModel]


WebModelType = TypeVar('WebModelType', bound=WebModel)
