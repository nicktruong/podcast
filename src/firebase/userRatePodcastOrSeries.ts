import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";
import { getUserRating } from "./getUserRating";

import type {
  Podcast,
  PodcastSeries,
  RatingFirestore,
} from "@/common/interfaces";
import type { PartialBy } from "@/common/types";

export const userRatePodcastOrSeries = async ({
  type,
  userId,
  rating,
  podcastOrSeriesId,
}: {
  type: typeof Collections.PODCAST_SERIES | typeof Collections.PODCASTS;
  userId: string;
  rating: number;
  podcastOrSeriesId: string;
}) => {
  const prevRating = await getUserRating({ userId, podcastOrSeriesId });

  // get series detail (rateCount, rating)
  const seriesRef = doc(db, type, podcastOrSeriesId);
  const seriesSnapshot = await getDoc(seriesRef);
  const { rating: oldRating, rateCount } =
    seriesSnapshot.data() as PodcastSeries & Podcast;

  // calculate new rating and rateCount
  const totalRatingScore = oldRating * rateCount;

  const newRating = prevRating
    ? (totalRatingScore - prevRating.rating + rating) / rateCount // if user edit his rating => remove his previous rating, add his current rating and get divided by rate count
    : (rateCount * oldRating + rating) / (rateCount + 1);

  const newRateCount = prevRating ? rateCount : rateCount + 1;

  // update (rateCount, rating)
  await updateDoc(seriesRef, { rateCount: newRateCount, rating: newRating });

  // create rating for this user
  const ratingDoc: PartialBy<RatingFirestore, "createdAt"> = {
    rating,
    userId,
    podcastOrSeriesId: podcastOrSeriesId,
    updatedAt: serverTimestamp(),
  };

  if (!prevRating) {
    ratingDoc.createdAt = serverTimestamp();
  }

  await setDoc(
    doc(db, Collections.RATINGS, `${userId}-rates-${podcastOrSeriesId}`),
    ratingDoc
  );

  return { newRateCount, newRating };
};
