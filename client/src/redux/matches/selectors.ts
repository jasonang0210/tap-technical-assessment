import { matchesAdapter } from "@/redux/matches/slice";
import { RootState } from "@/store";
import { MatchData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

const matchesSelector = matchesAdapter.getSelectors();
const selectMatchesState = (state: RootState) => state.matches;

export const selectAllMatches = createSelector(
    selectMatchesState,
    (matches) => matches.ids.map(id => matches.entities[id]) as MatchData[]
)

export const selectMatch = (id: number) => createSelector(
    selectMatchesState, matches =>
        matchesSelector.selectById(matches, id)
)

export const selectMatchIsLoading = createSelector(
    selectMatchesState,
    (matches) => matches.isLoading
)


