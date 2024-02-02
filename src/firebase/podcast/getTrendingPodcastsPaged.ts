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

import { db } from "../init";
import { downloadFile } from "../storage";

import { populatePodcastWithAuthor } from "./populatePodcastWithAuthor";

import type { Podcast, PopulatedPodcastWithAuthor } from "@/common/interfaces";

export const getTrendingPodcastsPaged = async ({
  offset,
  period = 7,
  pageSize = 8,
  categories = [],
}: {
  offset?: Date;
  period?: number;
  pageSize?: number;
  categories?: string[];
}) => {
  const trendingPeriod = new Date();
  trendingPeriod.setDate(trendingPeriod.getDate() - period);

  const podcasts: PopulatedPodcastWithAuthor[] = [];

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

    const populatedPodcasts = (await Promise.all(
      podcastsSnapshot.docs.map(async (snapshot) => {
        const podcast = {
          id: snapshot.id,
          ...snapshot.data(),
        } as Podcast;

        if (podcast.coverUrl && !podcast.coverUrl.startsWith("https")) {
          podcast.coverUrl = await downloadFile(podcast.coverUrl);
        }

        return populatePodcastWithAuthor(podcast);
      })
    )) as PopulatedPodcastWithAuthor[];

    podcasts.push(...populatedPodcasts);

    i++;
  } while (i < categories.length / 10 && podcasts.length < pageSize);

  return podcasts;
};
