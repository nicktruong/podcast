import { doc, getDoc } from "firebase/firestore";

import { Collections } from "@/enums";

import { db } from "../init";

import type { Rating, GetUserRatingOptions } from "@/common/interfaces";

export const getUserRating = async ({
  userId,
  podcastOrSeriesId,
}: GetUserRatingOptions): Promise<Rating | undefined> => {
  const docId = `${userId}-rates-${podcastOrSeriesId}`;
  const docRef = doc(db, Collections.RATINGS, docId);
  const snapshot = await getDoc(docRef);
  const rating = snapshot.data() as Rating | undefined;

  return rating;
};
