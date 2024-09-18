import { matchesAdapter } from "@/redux/matches/slice";
import { RootState } from "@/store";
import { MatchData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

const matchesSelector = matchesAdapter.getSelectors();
const selectMatchesState = (state: RootState) => state.matches;

export const selectAllMatches = createSelector(
    (state: RootState) => state.matches.entities,
    (state: RootState) => state.matches.ids,
    (matches, ids) => ids.map(id => matches[id]) as MatchData[]
)

export const selectMatch = (id: number) => createSelector(
    selectMatchesState, matches =>
        matchesSelector.selectById(matches, id)
)
