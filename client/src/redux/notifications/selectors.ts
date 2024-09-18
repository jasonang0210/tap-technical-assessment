import { RootState } from "@/store";
import { NotificationData } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllNotifications = createSelector(
    (state: RootState) => state.notifications,
    (notifications) => notifications.queue as NotificationData[]
)