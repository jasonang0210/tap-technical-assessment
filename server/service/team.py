from database import Database
from utils import singleton
from typing import List, Tuple
from models.route import TeamRouteModel
from models.database import TeamDatabaseModel, TeamMatchDatabaseModel
from models.web import TeamWebModel, TeamDetailedWebModel, MatchDetailedWebModel
from sqlalchemy.orm import aliased
from sqlalchemy import func, case, desc

@singleton
class TeamService:
    def __init__(self):
        self.db = Database()

    def add(self, teams: List[TeamRouteModel]):
        self.db.add_all(teams, TeamDatabaseModel)

    def fetch_all(self):
        return self.db.fetch_all(TeamDatabaseModel, TeamWebModel)
    
    def fetch_single(self, name: str):
        return self.db.fetch_single(name, TeamDatabaseModel, TeamWebModel)
    
    def fetch_detailed(self, name: str) -> TeamDetailedWebModel:
        with self.db.SessionFactory() as session:
            OpponentMatchDatabaseModel = aliased(TeamMatchDatabaseModel)

            matches = (
                session.query(
                    TeamMatchDatabaseModel.goals.label("team_goals"),
                    OpponentMatchDatabaseModel.goals.label("opponent_goals"),
                    case(
                        (TeamMatchDatabaseModel.goals > OpponentMatchDatabaseModel.goals, "Win"),
                        (TeamMatchDatabaseModel.goals < OpponentMatchDatabaseModel.goals, "Loss"),
                        else_="Draw"
                    ).label("outcome")
                )
                .join(TeamDatabaseModel.team_matches)
                .join(OpponentMatchDatabaseModel, TeamMatchDatabaseModel.match_id == OpponentMatchDatabaseModel.match_id)
                .filter(TeamMatchDatabaseModel.team_name == name)
                .filter(TeamMatchDatabaseModel.team_name != OpponentMatchDatabaseModel.team_name)
            ).all()

            return {
                **self.fetch_single(name),
                "matches": [MatchDetailedWebModel.model_validate(object).model_dump() for object in matches]
            }

            
