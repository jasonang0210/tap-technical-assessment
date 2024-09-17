import { matchesAPI } from "@/api/match";
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

export const fetchMatches = createAsyncThunk(
    'matches/fetchMatches',
    async (_, {rejectWithValue}) => {
        const {
            status,
            data,
            error
        } = await matchesAPI.fetchAll()
        if (isSuccessful(status)) {
            return data
        }
        return rejectWithValue(error)
    }
)

export const postMatches = createAsyncThunk(
    'matches/postMatches',
    async (data: string, {rejectWithValue}) => {
        const {
            status,
            error
        } = await matchesAPI.postMultiple(data)
        if (isSuccessful(status)) {
            console.log("success")
            return null
        }
        return rejectWithValue(error)
    }
)