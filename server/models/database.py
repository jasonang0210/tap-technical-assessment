from typing import List, TypeVar
from sqlalchemy import Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, relationship, mapped_column, Mapped
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
class DatabaseModel(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=DatabaseModel)
migrate = Migrate()

"""
Stores the basic team information
name: the team name
group: the group assigned to the team
registration_date: registration date, stored in DD/MM
"""
class TeamDatabaseModel(db.Model):
    __tablename__ = 'team'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, unique=True)
    group: Mapped[String] = mapped_column(String, nullable=False)
    registration_date: Mapped[str] = mapped_column(String, nullable=False)

    team_matches = relationship("TeamMatchDatabaseModel", back_populates="teams")

"""
Stores the details of a particular team's match statistics
team_name: foreign key to Team
match_id: foreign key to Match
goals: how many goals scored by <team_name> in <match_id>
"""
class TeamMatchDatabaseModel(db.Model):
    __tablename__ = 'team_match'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    team_name: Mapped[str] = mapped_column(String, ForeignKey('team.name', ondelete='CASCADE', onupdate='CASCADE'))
    match_id: Mapped[int] = mapped_column(Integer, ForeignKey('match.id', ondelete='CASCADE'))
    goals: Mapped[int] = mapped_column(Integer, nullable=False)

    teams = relationship("TeamDatabaseModel", back_populates="team_matches")
    matches = relationship("MatchDatabaseModel", back_populates="team_matches")

    __table_args__ = (
        UniqueConstraint('team_name', 'match_id', name='unique_team_match'),
    )

"""
Used primarily just to identify a match
id: uniquely generated match id
"""
class MatchDatabaseModel(db.Model):
    __tablename__ = 'match'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    team_matches = relationship("TeamMatchDatabaseModel", back_populates="matches")

DatabaseModelType = TypeVar('DatabaseModelType', bound=DatabaseModel)