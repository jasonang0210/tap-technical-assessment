import { teamsAPI } from "@/api/team";
import { isSuccessful } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRankings = createAsyncThunk(
    'rankings/fetchRankings',
    async (_, {rejectWithValue}) => {
        const {
            status,
            data,
            error
        } = await teamsAPI.fetchRanked()
        if (isSuccessful(status)) {
            return data
        }
        return rejectWithValue({status, message: error})
    }
)