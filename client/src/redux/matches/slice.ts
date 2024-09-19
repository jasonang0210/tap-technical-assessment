import { fetchMatches } from "./actions";
import { MatchData } from "@/types";
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

// MATCHES

export const matchesAdapter = createEntityAdapter<MatchData>();
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
            matchesAdapter.setAll(state, action.payload)
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