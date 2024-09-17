import { RootState } from "@/store";
import { MatchData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllMatches = createSelector(
    (state: RootState) => state.matches.entities,
    (state: RootState) => state.matches.ids,
    (matches, ids) => ids.map(id => matches[id]) as MatchData[]
)
