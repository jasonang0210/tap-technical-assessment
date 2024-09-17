import { fetchMatches, fetchTeams } from "@/redux/actions";
import { MatchData, TeamData } from "@/types";
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
    }

})

export const {
    postTeams,
    patchTeams
} = teamsSlice.actions

export const teamsReducer = teamsSlice.reducer;

// MATCHES

export const matchesAdapter = createEntityAdapter();
export const matchesInitialState = matchesAdapter.getInitialState({
    isLoading: false
})

const matchesSlice = createSlice({
    name: 'matches',
    initialState: matchesInitialState,
    reducers: {
        postMatches: (
            state,
            action: PayloadAction<MatchData>
        ) => {
            matchesAdapter.addOne(state, action.payload)
        },
        patchMatches: (
            state,
            action: PayloadAction<MatchData>
        ) => {
            matchesAdapter.upsertOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMatches.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchMatches.fulfilled, (state, action: PayloadAction<MatchData[]>) => {
            state.isLoading = false;
            matchesAdapter.upsertMany(state, action.payload)
        })
        .addCase(fetchMatches.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action)
        })
    }

})

export const {
    postMatches,
    patchMatches
} = matchesSlice.actions

export const matchesReducer = matchesSlice.reducer;