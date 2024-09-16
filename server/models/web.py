from pydantic import BaseModel, ConfigDict
from typing import List, TypeVar

class WebModel(BaseModel):
    pass

class TeamWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)
    
    name: str
    registration_date: str
    group: str

class MatchWebModel(WebModel):
    model_config = ConfigDict(from_attributes=True)

    team_name: str
    goals: int

WebModelType = TypeVar('WebModelType', bound=WebModel)
