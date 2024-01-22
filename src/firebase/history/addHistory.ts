import { doc, getDoc, updateDoc } from "firebase/firestore";

import { Collections } from "@/common/enums";
import { PodcastSeriesDetail } from "@/common/interfaces";

import { db } from "../init";

export const addHistory = async ({
  userId,
  seriesDetail,
}: {
  userId: string;
  seriesDetail: PodcastSeriesDetail;
}) => {
  const ref = doc(db, Collections.USERS, userId);
  const snapshot = await getDoc(ref);

  const user = snapshot.data();

  if (!user) {
    return;
  }

  user.history ??= [];

  const newHistory = user.history.filter(
    (id: string) => id !== seriesDetail.id
  );

  newHistory.unshift(seriesDetail.id);

  await updateDoc(ref, {
    history: newHistory,
  });
};
