import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { Notification } from "@/common/interfaces";
import { COLLECTIONS, USER_FIELDS } from "@/common/enums";

import { db } from "../init";

import { sendNotification } from "./sendNotification";

export const notifyFollower = async ({
  podcastId,
  creatorName,
  episodeName,
  // podcastName,
  creatorAvatar,
}: {
  podcastId: string;
  creatorName: string;
  episodeName: string;
  podcastName: string;
  creatorAvatar: string;
}) => {
  const createdAt = new Date().toISOString();

  // FCM
  await sendNotification({
    createdAt,
    creatorName,
    creatorAvatar,
    topic: podcastId,
    subject: episodeName,
    action: "just published",
  });

  // Firestore
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.USERS),
      where(USER_FIELDS.FOLLOWING, "array-contains", podcastId)
    )
  );

  const userIds = snapshot.docs.map((doc) => doc.id);
  const title = `<strong>${creatorName}</strong> just published <strong>${episodeName}</strong>`;

  // Create notification for all users
  const notification: Notification = {
    title,
    userIds,
    createdAt,
    readIds: [],
    creatorName,
    creatorAvatar,
  };
  await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), notification);
};
