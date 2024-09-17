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

WebModelType = TypeVar('WebModelType', bound=WebModel)
