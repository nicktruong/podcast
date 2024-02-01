import { onMessage } from "firebase/messaging";

import { store } from "@/store";
import { addNewNotification } from "@/store/notification";

import { messaging } from "../init";

import type { NotificationData } from "@/common/interfaces";

// Listen to FCM for new notifications
onMessage(messaging, ({ data }) => {
  if (!data) return;

  const { action, subject, createdAt, creatorName, creatorAvatar } =
    data as unknown as NotificationData;

  // TODO: Consider removing the title field
  store.dispatch(
    addNewNotification({
      createdAt,
      read: false,
      creatorName,
      creatorAvatar,
      title: `<strong>${creatorName}</strong> ${action} <strong>${subject}</strong>`,
    })
  );
});
