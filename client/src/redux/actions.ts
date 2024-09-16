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