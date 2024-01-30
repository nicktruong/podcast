import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

export const userUnfollowPodcast = async ({
  userId,
  podcastId,
}: {
  userId: string;
  podcastId: string;
}) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(userRef, { following: arrayRemove(podcastId) });
};
