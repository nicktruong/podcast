import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

export const selectNotifications = (state: RootState) =>
  state.notification.notifications;

export const selectUnreadNotificationsCount = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.filter((notification) => !notification.read).length
);
