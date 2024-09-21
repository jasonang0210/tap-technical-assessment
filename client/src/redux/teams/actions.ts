import { TeamsAPI } from "@/api/team";
import { PatchTeamArgs } from "@/types";
import { isSuccessful } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeams = createAsyncThunk(
    'teams/fetchTeams',
    async (_, {rejectWithValue}) => {
        const {
            status,
            data,
            error
        } = await TeamsAPI().fetchAll()
        if (isSuccessful(status)) {
            return data
        }
        return rejectWithValue({status, message: error})
    }
)

export const fetchTeam = createAsyncThunk(
    'teams/fetchTeam',
    async (name: string, {rejectWithValue}) => {
        const {
            status,
            data,
            error
        } = await TeamsAPI().fetchSingle(name)
        if (isSuccessful(status)) {
            return data
        }
        return rejectWithValue({status, message: error})
    }
)

export const postTeams = createAsyncThunk(
    'teams/postTeams',
    async (data: string, {rejectWithValue}) => {
        const {
            status,
            error
        } = await TeamsAPI().postMultiple(data)
        if (isSuccessful(status)) {
            return {status, message: "Teams are successfully created."}
        }
        return rejectWithValue({status, message: error})
    }
)

export const patchTeams = createAsyncThunk(
    'teams/patchTeams',
    async ({name, data}: PatchTeamArgs, {rejectWithValue}) => {
        const {
            status,
            error
        } = await TeamsAPI().patch(name, data)
        if (isSuccessful(status)) {
            return {status, message: `Team ${name} successfully patched.`}
        }
        return rejectWithValue({status, message: error})
    }
)