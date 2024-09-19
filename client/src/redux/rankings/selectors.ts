import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllRankings = createSelector(
    (state: RootState) => state.rankings.entities,
    (state: RootState) => state.rankings.ids,
    (rankings, ids) => ids.map(id => rankings[id])
)

export const selectRankingIsLoading = createSelector(
    (state: RootState) => state.rankings,
    (rankings) => rankings.isLoading
)
