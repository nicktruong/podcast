import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { Rating } from "@/common/interfaces";

export const getUserRating = async ({
  userId,
  podcastOrSeriesId,
}: {
  userId: string;
  podcastOrSeriesId: string;
}) => {
  const snapshot = await getDoc(
    doc(db, COLLECTIONS.RATINGS, `${userId}-rates-${podcastOrSeriesId}`)
  );
  const rating = snapshot.data() as Rating;

  return rating;
};
