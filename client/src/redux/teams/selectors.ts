import { teamsAdapter } from "@/redux/teams/slice";
import { RootState } from "@/store";
import { TeamData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

const teamsSelector = teamsAdapter.getSelectors();
const selectTeamsState = (state: RootState) => state.teams;

export const selectAllTeams = createSelector(
    selectTeamsState, teams => 
        teams.ids.map(id => teams.entities[id]) as TeamData[]
)

export const selectTeam = (name: string) => createSelector(
    selectTeamsState, teams =>
        teamsSelector.selectById(teams, name)
)

export const selectTeamIsLoading = createSelector(
    selectTeamsState, teams => teams.isLoading
)