import { getUserNotifcation, markAsRead } from "@/firebase";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

export const fetchNotifications = createAppAsyncThunk(
  "notification/fetchNotification",
  async (userId: string) => {
    const userNotifications = await getUserNotifcation(userId);

    return userNotifications;
  }
);

export const markAsReadNotifications = createAppAsyncThunk(
  "notification/markAsReadNotifications",
  async ({
    userId,
    notificationIds,
  }: {
    userId: string;
    notificationIds: string[];
  }) => {
    await markAsRead({ userId, notificationIds });

    return notificationIds;
  }
);
