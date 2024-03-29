import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { Collections } from "@/enums";

import { db } from "../init";

import { getMessagingToken } from "./getToken";
import { subscribeTokenToTopic } from "./subscribeTokenToTopic";

import type { PodcastUserIdPair } from "@/common/interfaces";

export const userFollowPodcast = async ({
  userId,
  podcastId,
}: PodcastUserIdPair) => {
  // Subscribe user to FCM topic
  const token = await getMessagingToken();
  await subscribeTokenToTopic({ token, topic: podcastId });

  // Update firestore
  const userRef = doc(db, Collections.USERS, userId);
  await updateDoc(userRef, { following: arrayUnion(podcastId) });
};
