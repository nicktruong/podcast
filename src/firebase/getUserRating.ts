import { doc, getDoc } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";

import type { Rating } from "@/common/interfaces";

export const getUserRating = async ({
  userId,
  podcastOrSeriesId,
}: {
  userId: string;
  podcastOrSeriesId: string;
}) => {
  const snapshot = await getDoc(
    doc(db, Collections.RATING, `${userId}-rates-${podcastOrSeriesId}`)
  );
  const rating = snapshot.data() as Rating;

  return rating;
};
