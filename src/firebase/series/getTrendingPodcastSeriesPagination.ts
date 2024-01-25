import {
  query,
  getDocs,
  orderBy,
  collection,
  startAfter,
  limit,
  where,
} from "firebase/firestore";

import { COLLECTIONS, PODCAST_FIELDS } from "@/common/enums";
import { Podcast, PopulatedPodcast } from "@/common/interfaces";

import { db } from "../init";
import { populatePodcast } from "../utils";

export const getTrendingPodcastsPaged = async ({
  offset,
  period = 7,
  pageSize = 7,
  categories = [],
}: {
  offset?: Date;
  period?: number;
  pageSize?: number;
  categories?: string[];
}) => {
  const trendingPeriod = new Date();
  trendingPeriod.setDate(trendingPeriod.getDate() - period);

  const podcasts: PopulatedPodcast[] = [];

  let i = 0;

  do {
    const subCategories = categories.slice(i * 10, i * 10 + 10);

    // firestore does not allow "in" to be used with empty array
    const categoryCondition = subCategories.length
      ? [where(PODCAST_FIELDS.CATEGORY, "in", subCategories)]
      : [];

    // decide based on playCount in period
    // offset based on last createdAt
    const podcastsQuery = query(
      collection(db, COLLECTIONS.PODCASTS),
      orderBy(PODCAST_FIELDS.PLAY_COUNT, "desc"),
      orderBy(PODCAST_FIELDS.CREATED_AT, "desc"),
      startAfter((offset ?? trendingPeriod).toISOString()),
      ...categoryCondition,
      limit(pageSize)
    );

    const podcastsSnapshot = await getDocs(podcastsQuery);

    const populatedPodcasts = await Promise.all(
      podcastsSnapshot.docs.map((snapshot) =>
        populatePodcast({ id: snapshot.id, ...snapshot.data() } as Podcast)
      )
    );

    podcasts.push(...populatedPodcasts);

    i++;
  } while (i < categories.length / 10 && podcasts.length < pageSize);

  return podcasts;
};