import { teamsAPI } from "@/api/team";
import { isSuccessful } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeams = createAsyncThunk(
    'teams/fetchTeams',
    async (_, {rejectWithValue}) => {
        const {
            status,
            data,
            error
        } = await teamsAPI.fetchAll()
        if (isSuccessful(status)) {
            return data
        }
        return rejectWithValue(error)
    }
)

export const fetchTeam = createAsyncThunk(
    'teams/fetchTeam',
    async (name: string, {rejectWithValue}) => {
        const {
            status,
            data,
            error
        } = await teamsAPI.fetchSingle(name)
        if (isSuccessful(status)) {
            return data
        }
        return rejectWithValue(error)
    }
)

export const postTeams = createAsyncThunk(
    'teams/postTeams',
    async (data: string, {rejectWithValue}) => {
        const {
            status,
            error
        } = await teamsAPI.postMultiple(data)
        if (isSuccessful(status)) {
            console.log("success")
            return null
        }
        return rejectWithValue(error)
    }
)

export const patchTeams = (name: string, data: string) => createAsyncThunk(
    'teams/patchTeams',
    async (_, {rejectWithValue}) => {
        const {
            status,
            error
        } = await teamsAPI.patch(name, data)
        if (isSuccessful(status)) {
            console.log("success")
            return null
        }
        return rejectWithValue(error)
    }
)()