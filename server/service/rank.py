from database import Database
from utils import singleton
from typing import List, Tuple
from models.database import TeamDatabaseModel, TeamMatchDatabaseModel
from models.web import RankingWebModel
from sqlalchemy.orm import aliased
from sqlalchemy import func, case, desc

@singleton
class RankingService:
    def __init__(self):
        self.db = Database()

    def fetch(self):
        with self.db.SessionFactory() as session:
            OpponentMatchDatabaseModel = aliased(TeamMatchDatabaseModel)

            rankings = (
                session.query(
                    TeamDatabaseModel.name,
                    TeamDatabaseModel.group,
                    TeamDatabaseModel.registration_date,
                    func.sum(TeamMatchDatabaseModel.goals).label("total_goals"),
                    func.sum(
                        case(
                            (TeamMatchDatabaseModel.goals > OpponentMatchDatabaseModel.goals, 3),
                            (TeamMatchDatabaseModel.goals == OpponentMatchDatabaseModel.goals, 1),
                            else_=0
                        )
                    ).label("total_points"),
                    func.sum(
                        case(
                            (TeamMatchDatabaseModel.goals > OpponentMatchDatabaseModel.goals, 5),
                            (TeamMatchDatabaseModel.goals == OpponentMatchDatabaseModel.goals, 3),
                            else_=1
                        )
                    ).label("total_alt_points"),
                )
                .join(TeamDatabaseModel.team_matches)
                .join(OpponentMatchDatabaseModel, TeamMatchDatabaseModel.match_id == OpponentMatchDatabaseModel.match_id)
                .filter(TeamMatchDatabaseModel.team_name != OpponentMatchDatabaseModel.team_name)
                .group_by(TeamDatabaseModel.name, TeamDatabaseModel.group)
                .order_by(
                    desc("total_points"),
                    desc("total_goals"),
                    desc("total_alt_points"),
                    desc("registration_date")
                )
            ).all()

            return [RankingWebModel.model_validate(object).model_dump() for object in rankings]



