import { generalAPI } from "@/api/base"
import { isSuccessful } from "@/utils"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const clearDatabase = createAsyncThunk(
    'notifications/clearDatabase',
    async (_, {rejectWithValue}) => {
        const {
            status,
            error
        } = await generalAPI.clearDatabase()
        if (isSuccessful(status)) {
            return {status, message: `Database successfully cleared.`}
        }
        return rejectWithValue({status, message: error})
    }
)