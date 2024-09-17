import { RootState } from "@/store";
import { MatchData, TeamData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllTeams = createSelector(
    (state: RootState) => state.teams.entities,
    (state: RootState) => state.teams.ids,
    (teams, ids) => ids.map(id => teams[id]) as TeamData[]
)

export const selectAllMatches = createSelector(
    (state: RootState) => state.matches.entities,
    (state: RootState) => state.matches.ids,
    (matches, ids) => ids.map(id => matches[id]) as MatchData[]
)