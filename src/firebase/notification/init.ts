/* eslint-disable @typescript-eslint/no-unused-vars */
import { onMessage } from "firebase/messaging";

import { store } from "@/store";
import { addNewNotification } from "@/store/notification";

import { messaging } from "../init";

import type { UserNotification } from "@/common/interfaces";

onMessage(messaging, ({ data }) => {
  if (!data) return;

  data = data as {
    action: string;
    subject: string;
    createdAt: string;
    creatorName: string;
    creatorAvatar: string;
  };

  store.dispatch(
    addNewNotification({
      createdAt: data.createdAt,
      creatorAvatar: data.creatorAvatar,
      creatorName: data.creatorName,
      read: false,
      title: `<strong>${data.creatorName}</strong> ${data.action} <strong>${data.subject}</strong>`,
    } as Omit<UserNotification, "id">)
  );
});
