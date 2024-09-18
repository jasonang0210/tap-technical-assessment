import { matchesAPI } from "@/api/match";
import { PatchMatchArgs } from "@/types";
import { isSuccessful } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
            return {status, message: "Matches are successfully created."}
        }
        return rejectWithValue({status, message: error})
    }
)

export const patchMatches = createAsyncThunk(
    'teams/patchMatches',
    async ({id, data}: PatchMatchArgs, {rejectWithValue}) => {
        const {
            status,
            error
        } = await matchesAPI.patch(id, data)
        if (isSuccessful(status)) {
            return {status, message: `Match ${id} successfully patched.`}
        }
        return rejectWithValue({status, message: error})
    }
)