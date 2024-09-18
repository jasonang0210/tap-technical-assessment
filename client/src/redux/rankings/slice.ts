import { fetchRankings } from "./actions";
import { RankedGroupData } from "@/types";
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const rankingsAdapter = createEntityAdapter({
    selectId: (ranking: RankedGroupData) => ranking.group
});
export const rankingsInitialState = rankingsAdapter.getInitialState({
    isLoading: false
})

const rankingsSlice = createSlice({
    name: 'rankings',
    initialState: rankingsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRankings.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchRankings.fulfilled, (state, action: PayloadAction<RankedGroupData[]>) => {
            state.isLoading = false;
            rankingsAdapter.upsertMany(state, action.payload)
        })
        .addCase(fetchRankings.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action)
        })
    }

})

export const rankingsReducer = rankingsSlice.reducer;