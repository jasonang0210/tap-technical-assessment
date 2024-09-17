import { fetchTeam, fetchTeams } from "./actions";
import { TeamData } from "@/types";
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

// TEAMS

export const teamsAdapter = createEntityAdapter({
    selectId: (team: TeamData) => team.name
});
export const teamsInitialState = teamsAdapter.getInitialState({
    isLoading: false
})

const teamsSlice = createSlice({
    name: 'teams',
    initialState: teamsInitialState,
    reducers: {
        postTeams: (
            state,
            action: PayloadAction<TeamData>
        ) => {
            teamsAdapter.addOne(state, action.payload)
        },
        patchTeams: (
            state,
            action: PayloadAction<TeamData>
        ) => {
            teamsAdapter.upsertOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTeams.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<TeamData[]>) => {
            state.isLoading = false;
            teamsAdapter.upsertMany(state, action.payload)
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

export const {
    postTeams,
    patchTeams
} = teamsSlice.actions

export const teamsReducer = teamsSlice.reducer;