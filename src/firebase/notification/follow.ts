import { getToken } from "firebase/messaging";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db, messaging } from "../init";

import { subscribeTokenToTopic } from "./subscribeTokenToTopic";

export const userFollowPodcast = async ({
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

  await subscribeTokenToTopic({ token, topic: podcastId });

  // Update firestore
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(userRef, { following: arrayUnion(podcastId) });
};
