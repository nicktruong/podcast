import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  RATING,
  PODCAST_SERIES,
  PODCASTS,
} from "@/common/constants/firestoreCollectionNames";
import { Pod } from "@/common/interfaces";
import { PartialBy } from "@/common/types/PartialBy";
import { PodcastSeries } from "@/common/interfaces/PodcastSeries";
import { RatingFirestore } from "@/common/interfaces/Rating";

import { db } from "./init";
import { getUserRate } from "./getUserRate";

export const ratePodcastOrSeries = async ({
  type,
  userId,
  rating,
  podcastOrSeriesId,
}: {
  type: typeof PODCAST_SERIES | typeof PODCASTS;
  userId: string;
  rating: number;
  podcastOrSeriesId: string;
}) => {
  const prevRating = await getUserRate({ userId, podcastOrSeriesId });

  // get series detail (rateCount, rating)
  const seriesRef = doc(db, type, podcastOrSeriesId);
  const seriesSnapshot = await getDoc(seriesRef);
  const { rating: oldRating, rateCount } =
    seriesSnapshot.data() as PodcastSeries & Pod;

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
    doc(db, RATING, `${userId}-rates-${podcastOrSeriesId}`),
    ratingDoc
  );

  return { newRateCount, newRating };
};
