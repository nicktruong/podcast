import { doc, getDoc, updateDoc } from "firebase/firestore";

import { User } from "@/common/interfaces";
import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

export const addHistory = async ({
  userId,
  podcastId,
}: {
  userId: string;
  podcastId: string;
}) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  const userSnapshot = await getDoc(userRef);
  const user = userSnapshot.data() as User;

  if (!user) {
    return;
  }

  user.history ??= [];

  const newHistory = user.history.filter((id: string) => id !== podcastId);

  newHistory.unshift(podcastId);

  await updateDoc(userRef, {
    history: newHistory,
  });
};
