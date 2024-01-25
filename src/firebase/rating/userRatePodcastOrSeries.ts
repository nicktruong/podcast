import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import { getUserRating } from "./getUserRating";

import type { Episode, Podcast, Rating } from "@/common/interfaces";
import type { PartialBy } from "@/common/types";

export const rate = async ({
  type,
  userId,
  rating,
  podcastOrSeriesId,
}: {
  type: typeof COLLECTIONS.PODCASTS | typeof COLLECTIONS.EPISODES;
  userId: string;
  rating: number;
  podcastOrSeriesId: string;
}) => {
  const prevRating = await getUserRating({ userId, podcastOrSeriesId });

  // get podcast detail (rateCount, rating)
  const podcastRef = doc(db, type, podcastOrSeriesId);
  const podcastSnapshot = await getDoc(podcastRef);
  const { rating: oldRating, rateCount } = podcastSnapshot.data() as Podcast &
    Episode;

  const currentDate = new Date().toISOString();

  if (!oldRating || rateCount === 0) {
    await updateDoc(podcastRef, { rateCount: 1, rating });

    const ratingDoc: Rating = {
      rating,
      userId,
      createdAt: currentDate,
      updatedAt: currentDate,
      podcastOrSeriesId: podcastOrSeriesId,
    };

    await setDoc(
      doc(db, COLLECTIONS.RATINGS, `${userId}-rates-${podcastOrSeriesId}`),
      ratingDoc
    );

    return { newRateCount: 1, newRating: rating };
  }

  // calculate new rating and rateCount
  const totalRatingScore = oldRating * rateCount;

  const newRating = prevRating
    ? (totalRatingScore - prevRating.rating + rating) / rateCount // if user edit his rating => remove his previous rating, add his current rating and get divided by rate count
    : (rateCount * oldRating + rating) / (rateCount + 1);

  const newRateCount = prevRating ? rateCount : rateCount + 1;

  // update (rateCount, rating)
  await updateDoc(podcastRef, { rateCount: newRateCount, rating: newRating });

  // create rating for this user
  const ratingDoc: PartialBy<Rating, "createdAt"> = {
    rating,
    userId,
    updatedAt: currentDate,
    podcastOrSeriesId: podcastOrSeriesId,
  };

  if (!prevRating) {
    ratingDoc.createdAt = currentDate;
  }

  await setDoc(
    doc(db, COLLECTIONS.RATINGS, `${userId}-rates-${podcastOrSeriesId}`),
    ratingDoc
  );

  return { newRateCount, newRating };
};
