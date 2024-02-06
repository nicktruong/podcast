import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { Collections } from "@/enums";

import { db } from "../init";

import { getMessagingToken } from "./getToken";
import { removeTokenFromTopic } from "./removeTokenFromTopic";

import type { PodcastUserIdPair } from "@/common/interfaces";

export const userUnfollowPodcast = async ({
  userId,
  podcastId,
}: PodcastUserIdPair) => {
  // Update FCM
  const token = await getMessagingToken();
  await removeTokenFromTopic({ token, topic: podcastId });

  // Update firestore
  const userRef = doc(db, Collections.USERS, userId);
  await updateDoc(userRef, { following: arrayRemove(podcastId) });
};
