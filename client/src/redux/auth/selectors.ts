import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAuthCount = createSelector(
    (state: RootState) => state.auth,
    (auth) => auth.count
)

export const selectAuthStatus = createSelector(
    (state: RootState) => state.auth,
    (auth) => auth.login
)