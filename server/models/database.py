from typing import List, TypeVar
from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import DeclarativeBase, relationship, mapped_column, Mapped

class DatabaseModel(DeclarativeBase):
    pass

"""
Stores the basic team information
name: the team name
group: the group assigned to the team
registration_date: registration date, stored in DD/MM
"""
class TeamDatabaseModel(DatabaseModel):
    __tablename__ = 'team'

    # assume to be not editable
    name: Mapped[str] = mapped_column(String, primary_key=True)
    group: Mapped[String] = mapped_column(String, nullable=False)
    registration_date: Mapped[str] = mapped_column(String, nullable=False)

    team_matches = relationship("TeamMatchDatabaseModel", back_populates="teams")

"""
Stores the details of a particular team's match statistics
team_name: foreign key to Team
match_id: foreign key to Match
goals: how many goals scored by <team_name> in <match_id>
"""
class TeamMatchDatabaseModel(DatabaseModel):
    __tablename__ = 'team_match'

    team_name: Mapped[str] = mapped_column(String, ForeignKey('team.name', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True)
    match_id: Mapped[int] = mapped_column(Integer, ForeignKey('match.id', ondelete='CASCADE'), primary_key=True)
    goals: Mapped[int] = mapped_column(Integer, nullable=False)

    teams = relationship("TeamDatabaseModel", back_populates="team_matches")
    matches = relationship("MatchDatabaseModel", back_populates="team_matches")

"""
Used primarily just to identify a match
id: uniquely generated match id
"""
class MatchDatabaseModel(DatabaseModel):
    __tablename__ = 'match'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    team_matches = relationship("TeamMatchDatabaseModel", back_populates="matches")

DatabaseModelType = TypeVar('DatabaseModelType', bound=DatabaseModel)