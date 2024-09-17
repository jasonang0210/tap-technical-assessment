import { rankingsAPI } from "@/api/ranking";
import { isSuccessful } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRankings = createAsyncThunk(
    'teams/fetchRankings',
    async (_, {rejectWithValue}) => {
        const {
            status,
            data,
            error
        } = await rankingsAPI.fetchAll()
        if (isSuccessful(status)) {
            return data
        }
        return rejectWithValue(error)
    }
)