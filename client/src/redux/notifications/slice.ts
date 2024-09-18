import { patchMatches, postMatches } from '@/redux/matches/actions';
import { NotificationData } from './../../types';

import { patchTeams, postTeams } from "@/redux/teams/actions";
import { NotificationStore } from "@/types";
import { createSlice, Draft } from "@reduxjs/toolkit";
import { clearDatabase } from '@/redux/notifications/actions';

const notificationsInitialState: NotificationStore  = {
    queue: []
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: notificationsInitialState,
    reducers: {
        dequeueNotification: (state) => {
            if (state.queue.length == 0) {
                return state;
            }
            state.queue.shift();
            return state
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(patchTeams.fulfilled, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(patchTeams.rejected, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(postTeams.fulfilled, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(postTeams.rejected, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(patchMatches.fulfilled, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(patchMatches.rejected, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(postMatches.fulfilled, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(postMatches.rejected, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(clearDatabase.fulfilled, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
        .addCase(clearDatabase.rejected, (state: Draft<NotificationStore>, action) => {
            state.queue.push(action.payload as NotificationData)
        })
    }

})

export const {
    dequeueNotification
} = notificationsSlice.actions

export const notificationsReducer = notificationsSlice.reducer;