import { fetchRankings } from "./actions";
import { RankingData } from "@/types";
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const rankingsAdapter = createEntityAdapter({
    selectId: (ranking: RankingData) => ranking.name
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
        .addCase(fetchRankings.fulfilled, (state, action: PayloadAction<RankingData[]>) => {
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