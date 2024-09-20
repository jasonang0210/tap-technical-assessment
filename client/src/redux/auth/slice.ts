import { login, logout, signup } from "@/redux/auth/actions";
import { AuthStore } from "@/types";
import { createSlice, Draft } from "@reduxjs/toolkit";

const authInitialState: AuthStore  = {
    count: 1,
    login: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state: Draft<AuthStore>) => {
            state.count++;
            state.login = true
        })
        .addCase(signup.fulfilled, (state: Draft<AuthStore>) => {
            state.count++;
            state.login = true
        })
        .addCase(logout.fulfilled, (state: Draft<AuthStore>) => {
            state.count++;
            state.login = false
        })
    }
})

export const authReducer = authSlice.reducer;