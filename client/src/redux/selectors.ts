import { RootState } from "@/store";
import { TeamData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllTeams = createSelector(
    (state: RootState) => state.teams.entities,
    (state: RootState) => state.teams.ids,
    (teams, ids) => ids.map(id => teams[id]) as TeamData[]
)