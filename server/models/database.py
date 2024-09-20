from typing import TypeVar
from sqlalchemy import Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, relationship, mapped_column, Mapped
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
class DatabaseModel(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=DatabaseModel)
migrate = Migrate()

"""
Stores the user information
username: username chosen by user
password: password chosen by user
"""
class UserDatabaseModel(db.Model):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)

"""
Stores the basic team information
name: the team name (NOTE: will be prepended with user_id, in order to avoid overlapping team names between users)
group: the group assigned to the team
registration_date: registration date, stored in DD/MM
user_id: foreign key to User, to denote which rows belong to which user
"""
class TeamDatabaseModel(db.Model):
    __tablename__ = 'team'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, unique=True)
    group: Mapped[String] = mapped_column(String, nullable=False)
    registration_date: Mapped[str] = mapped_column(String, nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))

    team_matches = relationship("TeamMatchDatabaseModel", back_populates="teams")

"""
Stores the details of a particular team's match statistics
team_name: foreign key to Team (NOTE: will be prepended with user_id, in order to avoid overlapping team names between users)
match_id: foreign key to Match
goals: how many goals scored by <team_name> in <match_id>
user_id: foreign key to User, to denote which rows belong to which user
"""
class TeamMatchDatabaseModel(db.Model):
    __tablename__ = 'team_match'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    team_name: Mapped[str] = mapped_column(String, ForeignKey('team.name', ondelete='CASCADE', onupdate='CASCADE'))
    match_id: Mapped[int] = mapped_column(Integer, ForeignKey('match.id', ondelete='CASCADE'))
    goals: Mapped[int] = mapped_column(Integer, nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))

    teams = relationship("TeamDatabaseModel", back_populates="team_matches")
    matches = relationship("MatchDatabaseModel", back_populates="team_matches")

    __table_args__ = (
        UniqueConstraint('team_name', 'match_id', name='unique_team_match'),
    )

"""
Used primarily just to identify a match
id: uniquely generated match id
user_id: foreign key to User, to denote which rows belong to which user
"""
class MatchDatabaseModel(db.Model):
    __tablename__ = 'match'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('user.id'))

    team_matches = relationship("TeamMatchDatabaseModel", back_populates="matches")

DatabaseModelType = TypeVar('DatabaseModelType', bound=DatabaseModel)