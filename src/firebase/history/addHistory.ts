import { doc, getDoc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { User, PodcastUserIdPair } from "@/common/interfaces";

export const addHistory = async ({
  userId,
  podcastId,
}: PodcastUserIdPair): Promise<void> => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  const userSnapshot = await getDoc(userRef);
  const user = userSnapshot.data() as User | undefined;

  if (!user) return;

  user.history ??= [];

  const newHistory = user.history.filter((id: string) => id !== podcastId);

  newHistory.unshift(podcastId);

  await updateDoc(userRef, {
    history: newHistory,
  });
};
