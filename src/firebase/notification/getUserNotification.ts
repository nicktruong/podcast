import { collection, getDocs, query, where } from "firebase/firestore";

import { COLLECTIONS, NOTIFICATION_FIELDS } from "@/common/enums";

import { db } from "../init";

import type { Notification, UserNotification } from "@/common/interfaces";

export const getUserNotifcation = async (userId: string) => {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.NOTIFICATIONS),
      where(NOTIFICATION_FIELDS.USER_IDS, "array-contains", userId)
    )
  );

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Notification;

    const userNotification: UserNotification = {
      id: doc.id,
      title: data.title,
      createdAt: data.createdAt,
      creatorName: data.creatorName,
      creatorAvatar: data.creatorAvatar,
      read: data.readIds.includes(userId),
    };

    return userNotification;
  });
};
