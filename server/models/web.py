from pydantic import BaseModel, ConfigDict, Field, field_validator, model_serializer
from typing import List, TypeVar, Optional
from utils import swap_date_month, remove_user_id_from_team_name

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
    
    @field_validator('name')
    @classmethod
    def manipulate_team_name(cls, name):
        return remove_user_id_from_team_name(name)

    @field_validator('registration_date')
    @classmethod
    def format_date(cls, registration_date: str) -> str:
        # unswap the date to DD/MM so that the user will view it in the original format
        return swap_date_month(registration_date)

class TeamMatchWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)

    team_name: str
    goals: int

    @field_validator('team_name')
    @classmethod
    def manipulate_team_name(cls, team_name):
        return remove_user_id_from_team_name(team_name)
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

    @field_validator('opponent_team_name')
    @classmethod
    def manipulate_team_name(cls, opponent_team_name):
        return remove_user_id_from_team_name(opponent_team_name)
class TeamDetailedWebModel(TeamWebModel):
    model_config = ConfigDict(from_attributes=True)

    matches: List[MatchDetailedWebModel]


WebModelType = TypeVar('WebModelType', bound=WebModel)
