import { useEffect } from "react";

import {
  selectNotifications,
  markAsReadNotifications,
} from "@/store/notification";
import { selectUserId } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const notifications = useAppSelector(selectNotifications);

  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    if (!userId) return;

    dispatch(
      markAsReadNotifications({
        userId,
        notificationIds: notifications.map(({ id }) => id),
      })
    );
  }, [userId]);

  return { classes, notifications };
};
