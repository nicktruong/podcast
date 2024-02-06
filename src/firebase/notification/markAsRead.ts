import { arrayUnion, doc, writeBatch } from "firebase/firestore";

import { Collections } from "@/enums";

import { db } from "../init";

import type { UserNotificationsIds } from "@/common/interfaces";

export const markAsRead = async ({
  userId,
  notificationIds,
}: UserNotificationsIds) => {
  const batch = writeBatch(db);

  notificationIds.forEach((id) => {
    const notificationRef = doc(db, Collections.NOTIFICATIONS, id);
    batch.update(notificationRef, { readIds: arrayUnion(userId) });
  });

  await batch.commit();
};
