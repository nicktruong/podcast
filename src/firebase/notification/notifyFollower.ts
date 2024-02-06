import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { Collections } from "@/enums";
import { UserFields } from "@/firebase/fields";

import { db } from "../init";

import { sendNotification } from "./sendNotification";

import type { Notification, NotifyFollowerOptions } from "@/common/interfaces";

// TODO: Review params
export const notifyFollower = async ({
  podcastId,
  creatorName,
  episodeName,
  // podcastName,
  creatorAvatar,
}: NotifyFollowerOptions) => {
  const createdAt = new Date().toISOString();

  // Firestore
  const snapshot = await getDocs(
    query(
      collection(db, Collections.USERS),
      where(UserFields.FOLLOWING, "array-contains", podcastId)
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
  const docRef = await addDoc(
    collection(db, Collections.NOTIFICATIONS),
    notification
  );

  // FCM
  await sendNotification({
    createdAt,
    creatorName,
    id: docRef.id,
    creatorAvatar,
    topic: podcastId,
    subject: episodeName,
    action: "just published",
  });
};
