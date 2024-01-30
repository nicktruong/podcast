import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

import { fetchNotifications, markAsReadNotifications } from "./thunks";

import type { UserNotification } from "@/common/interfaces";

export interface NotificationState {
  isLoadingNotifications: boolean;
  notifications: UserNotification[];
}

const initialState: NotificationState = {
  notifications: [],
  isLoadingNotifications: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNewNotification: (
      state,
      action: PayloadAction<Omit<UserNotification, "id">>
    ) => {
      state.notifications.unshift({ id: nanoid(), ...action.payload });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoadingNotifications = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
        state.isLoadingNotifications = false;
        state.notifications = payload;
      })
      .addCase(fetchNotifications.rejected, (state, { error }) => {
        state.isLoadingNotifications = false;
        console.error(error);
      });

    builder
      .addCase(markAsReadNotifications.fulfilled, (state, { payload }) => {
        state.notifications.forEach(
          (notification) =>
            payload.includes(notification.id) && (notification.read = true)
        );
      })
      .addCase(markAsReadNotifications.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export const { addNewNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
