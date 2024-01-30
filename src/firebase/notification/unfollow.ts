import { getToken } from "firebase/messaging";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db, messaging } from "../init";

import { removeTokenFromTopic } from "./removeTokenFromTopic";

export const userUnfollowPodcast = async ({
  userId,
  podcastId,
}: {
  userId: string;
  podcastId: string;
}) => {
  // Update FCM
  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  });

  await removeTokenFromTopic({ token, topic: podcastId });

  // Update firestore
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(userRef, { following: arrayRemove(podcastId) });
};
