from database import Database
from utils import singleton
from typing import List, Tuple
from models.route import TeamRouteModel
from models.database import TeamDatabaseModel, TeamMatchDatabaseModel
from models.web import TeamWebModel, TeamDetailedWebModel, MatchDetailedWebModel, RankedGroupWebModel
from sqlalchemy.orm import aliased
from sqlalchemy import func, case, desc, asc
from models.database import db

@singleton
class TeamService:
    def __init__(self):
        self.db = Database()

    def add(self, teams: List[TeamRouteModel]):
        self.db.add_all(teams, TeamDatabaseModel)

    def fetch_all(self):
        return self.db.fetch_all(TeamDatabaseModel, TeamWebModel)
    
    def fetch_single(self, name: str):
        return self.db.fetch_single("name", name, TeamDatabaseModel, TeamWebModel)
    
    def fetch_detailed(self, name: str) -> TeamDetailedWebModel:
        OpponentMatchDatabaseModel = aliased(TeamMatchDatabaseModel)

        # TODO: clean this up!
        matches = (
            db.session.query(
                TeamMatchDatabaseModel.goals.label("team_goals"),
                OpponentMatchDatabaseModel.team_name.label("opponent_team_name"),
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
    
    def fetch_ranked(self):
        OpponentMatchDatabaseModel = aliased(TeamMatchDatabaseModel)

        # TODO: clean this up! should be able to abstract out to combine with fetch_detailed somewhat
        subquery = (
            db.session.query(
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
            .group_by(TeamDatabaseModel.name, TeamDatabaseModel.group, TeamDatabaseModel.registration_date)
            .order_by(
                desc("total_points"),
                desc("total_goals"),
                desc("total_alt_points"),
                asc("registration_date")
            )
        )

        # TODO: find a way to make this variable, instead of hard coded
        groups = ["1", "2"]
        return [RankedGroupWebModel(group=group, teams=subquery.filter(TeamDatabaseModel.group == group).all()).model_dump() for group in groups]
    
    def delete_all(self):
        db.session.query(TeamDatabaseModel).delete()
        db.session.commit()

    def patch(self, name: str, team: TeamRouteModel):
        db.session.query(TeamDatabaseModel).filter(TeamDatabaseModel.name == name).update(team.model_dump())
        db.session.commit()

            
