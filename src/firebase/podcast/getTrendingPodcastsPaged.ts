import {
  limit,
  where,
  query,
  getDocs,
  orderBy,
  collection,
  startAfter,
} from "firebase/firestore";

import { Collections } from "@/enums";
import { PodcastFields } from "@/firebase/fields";

import { db } from "../init";
import { downloadFile } from "../storage";

import { populatePodcastWithAuthor } from "./populatePodcastWithAuthor";

import type { Podcast, PopulatedPodcastWithAuthor } from "@/common/interfaces";
import type { GetTrendingPodcastsOptions } from "./interfaces";

export const getTrendingPodcastsPaged = async ({
  offset,
  period = 7,
  pageSize = 8,
  categories = [],
}: GetTrendingPodcastsOptions) => {
  const trendingPeriod = new Date();
  trendingPeriod.setDate(trendingPeriod.getDate() - period);

  const podcasts: PopulatedPodcastWithAuthor[] = [];

  let i = 0;

  do {
    const subCategories = categories.slice(i * 10, i * 10 + 10);

    // firestore does not allow "in" to be used with empty array
    const categoryCondition = subCategories.length
      ? [where(PodcastFields.CATEGORY, "in", subCategories)]
      : [];

    // decide based on playCount in period
    // offset based on last createdAt
    const podcastsQuery = query(
      collection(db, Collections.PODCASTS),
      orderBy(PodcastFields.PLAY_COUNT, "desc"),
      orderBy(PodcastFields.CREATED_AT, "desc"),
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
