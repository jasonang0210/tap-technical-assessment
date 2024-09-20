import { generalAPI } from "@/api/base"
import { UserDetails } from "@/types"
import { isSuccessful } from "@/utils"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const signup = createAsyncThunk(
    'auth/signup',
    async (userData: UserDetails, {rejectWithValue}) => {
        const {
            data,
            status,
            error
        } = await generalAPI.signup(userData)
        if (isSuccessful(status)) {
            const {token} = data as {token: string}
            localStorage.setItem('tap auth token', token)
            localStorage.setItem('tap auth username', userData.username)
            return {status, message: `User successfully signed up and logged in.`}
        }
        return rejectWithValue({status, message: error})
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (userData: UserDetails, {rejectWithValue}) => {
        const {
            data,
            status,
            error
        } = await generalAPI.login(userData)
        if (isSuccessful(status)) {
            const {token} = data as {token: string}
            localStorage.setItem('tap auth token', token)
            localStorage.setItem('tap auth username', userData.username)
            return {status, message: `User successfully logged in.`}
        }
        return rejectWithValue({status, message: error})
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        localStorage.removeItem('tap auth token')
        localStorage.removeItem('tap auth username')
        return {status: "200", message: 'User successfully logged out.'}
    }
)