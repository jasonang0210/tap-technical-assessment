from database.base import Database
from models.route import TeamRouteModel
from models.database import TeamDatabaseModel, TeamMatchDatabaseModel
from sqlalchemy.orm import aliased
from sqlalchemy import func, case, desc, asc

class TeamDatabase(Database[TeamRouteModel, TeamDatabaseModel]):
    def __init__(self, user_id: int):
        super().__init__(TeamDatabaseModel, user_id)

    def fetch_ranked(self, group: str):
        OpponentMatchDatabaseModel = aliased(TeamMatchDatabaseModel)

        return (
            self.session.query(
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
            .filter(TeamDatabaseModel.user_id == self.user_id)
            .join(TeamDatabaseModel.team_matches)
            .join(OpponentMatchDatabaseModel, TeamMatchDatabaseModel.match_id == OpponentMatchDatabaseModel.match_id)
            .filter(TeamMatchDatabaseModel.team_name != OpponentMatchDatabaseModel.team_name)
            .filter(TeamDatabaseModel.group == group)
            .group_by(TeamDatabaseModel.name, TeamDatabaseModel.group, TeamDatabaseModel.registration_date)
            .order_by(
                desc("total_points"),
                desc("total_goals"),
                desc("total_alt_points"),
                asc("registration_date")
            )
        ).all()

    def fetch_team_matches(self, name: str):
        OpponentMatchDatabaseModel = aliased(TeamMatchDatabaseModel)

        return (
            self.session.query(
                TeamMatchDatabaseModel.goals.label("team_goals"),
                OpponentMatchDatabaseModel.team_name.label("opponent_team_name"),
                OpponentMatchDatabaseModel.goals.label("opponent_goals"),
                case(
                    (TeamMatchDatabaseModel.goals > OpponentMatchDatabaseModel.goals, "Win"),
                    (TeamMatchDatabaseModel.goals < OpponentMatchDatabaseModel.goals, "Loss"),
                    else_="Draw"
                ).label("outcome")
            )
            .filter(TeamDatabaseModel.user_id == self.user_id)
            .join(TeamDatabaseModel.team_matches)
            .join(OpponentMatchDatabaseModel, TeamMatchDatabaseModel.match_id == OpponentMatchDatabaseModel.match_id)
            .filter(TeamMatchDatabaseModel.team_name == name)
            .filter(TeamMatchDatabaseModel.team_name != OpponentMatchDatabaseModel.team_name)
        ).all()


