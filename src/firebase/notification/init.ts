import { getMessaging, onMessage } from "firebase/messaging";

import { store } from "@/store";
import { addNewNotification } from "@/store/notification";

import { app } from "../init";

import type { NotificationData } from "@/common/interfaces";

const messaging = getMessaging(app);

// Listen to FCM for new notifications
onMessage(messaging, ({ data }) => {
  if (!data) return;

  const { id, action, subject, createdAt, creatorName, creatorAvatar } =
    data as unknown as NotificationData;

  // TODO: Consider removing the title field
  store.dispatch(
    addNewNotification({
      id,
      createdAt,
      read: false,
      creatorName,
      creatorAvatar,
      title: `<strong>${creatorName}</strong> ${action} <strong>${subject}</strong>`,
    })
  );
});
