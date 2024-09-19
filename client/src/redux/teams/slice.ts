import { fetchTeam, fetchTeams } from "./actions";
import { TeamData } from "@/types";
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

// TEAMS

export const teamsAdapter = createEntityAdapter({
    selectId: (team: TeamData) => team.name
});
export const teamsInitialState = teamsAdapter.getInitialState({
    isLoading: false,
})

const teamsSlice = createSlice({
    name: 'teams',
    initialState: teamsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTeams.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<TeamData[]>) => {
            state.isLoading = false;
            teamsAdapter.setAll(state, action.payload)
        })
        .addCase(fetchTeams.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action)
        })

        .addCase(fetchTeam.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchTeam.fulfilled, (state, action: PayloadAction<TeamData>) => {
            state.isLoading = false;
            teamsAdapter.upsertOne(state, action.payload)
        })
        .addCase(fetchTeam.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action)
        })
    }

})

export const teamsReducer = teamsSlice.reducer;