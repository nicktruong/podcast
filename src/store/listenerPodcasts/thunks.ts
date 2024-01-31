import {
  getRandomPocastsPaged,
  getTrendingPodcastsPaged,
  getRecentlyPlayedPodcastsPaged,
  getPodcastsByCategorySortedAndPaged,
  populatePodcast,
} from "@/firebase";
import { createAppAsyncThunk } from "@/store/createAppAsyncThunk";

import type {
  FetchPodcastsOptions,
  FetchPodcastsToTryOptions,
  FetchPodcastsForYouOptions,
  FetchRecentlyPlayedPodcastsOptions,
  FetchPodcastsByCategorySortedAndPaged,
} from "./interfaces";
import type { PopulatedPodcastWithAuthor } from "@/common/interfaces";

export const fetchRecentlyPlayedPodcastsPaged = createAppAsyncThunk(
  "listenerPodcasts/fetchRecentlyPlayedPodcastsPaged",
  async ({
    offset = 0,
    pageSize = 7,
    userHistory = [],
  }: FetchRecentlyPlayedPodcastsOptions) => {
    if (userHistory.length === 0) return;

    const podcasts = await getRecentlyPlayedPodcastsPaged({
      offset,
      pageSize,
      history: userHistory,
    });

    return podcasts;
  }
);

export const populateStandoutPodcast = createAppAsyncThunk(
  "listenerPodcasts/populateStandoutPodcast",
  async (podcastToPopulate: PopulatedPodcastWithAuthor) => {
    const podcastWithEpisodes = await populatePodcast(podcastToPopulate);

    return podcastWithEpisodes;
  }
);

export const fetchTrendingPodcastsPaged = createAppAsyncThunk(
  "listenerPodcasts/fetchTrendingPodcastsPaged",
  async (
    { offset, period = 7, pageSize = 8 }: FetchPodcastsOptions,
    thunkApi
  ) => {
    const trendingPodcasts = await getTrendingPodcastsPaged({
      period,
      offset,
      pageSize,
    });

    thunkApi.dispatch(populateStandoutPodcast(trendingPodcasts[0]));

    return trendingPodcasts.slice(1);
  }
);

export const fetchPodcastsForYouPaged = createAppAsyncThunk(
  "listenerPodcasts/fetchPodcastsForYouPaged",
  async ({
    offset,
    categories,
    period = 7,
    pageSize = 7,
    podcastIdsToExclude,
  }: FetchPodcastsForYouOptions) => {
    const podcastsForYou: PopulatedPodcastWithAuthor[] = [];
    const MAX_REDO = 3;
    let redo = 0;
    const redoPeriodScales = [1, 2, 7];

    while (podcastsForYou.length < pageSize && redo < MAX_REDO) {
      const podcasts = await getTrendingPodcastsPaged({
        offset,
        categories,
        period: period * redoPeriodScales[redo],
        pageSize: pageSize * redoPeriodScales[redo],
      });

      const podcastsForYouIds = podcastsForYou.map((podcast) => podcast.id);

      podcastsForYou.push(
        ...podcasts.filter(
          (podcast) =>
            !podcastIdsToExclude?.includes(podcast.id) &&
            !podcastsForYouIds.includes(podcast.id)
        )
      );
      redo++;
    }

    return podcastsForYou;
  }
);

export const fetchPodcastsToTryPaged = createAppAsyncThunk(
  "listenerPodcasts/fetchPodcastsToTryPaged",
  async ({ pageSize = 7, podcastIdsToExclude }: FetchPodcastsToTryOptions) => {
    const podcastsToTry: PopulatedPodcastWithAuthor[] = [];
    const MAX_REDO = 3;
    const redoPeriodScales = [1, 2, 7];
    let redo = 0;

    while (podcastsToTry.length < pageSize && redo < MAX_REDO) {
      const podcasts = await getRandomPocastsPaged({
        pageSize: pageSize * redoPeriodScales[redo],
      });

      const podcastsToTryIds = podcastsToTry.map((podcast) => podcast.id);

      podcastsToTry.push(
        ...podcasts.filter(
          (podcast) =>
            !podcastIdsToExclude?.includes(podcast.id) &&
            !podcastsToTryIds.includes(podcast.id)
        )
      );

      redo++;
    }

    return podcastsToTry;
  }
);

export const fetchPodcastsByCategorySortedAndPaged = createAppAsyncThunk(
  "listenerPodcasts/fetchPodcastsByCategorySortedAndPaged",
  async ({
    offset,
    sortBy,
    pageSize,
    categories,
  }: FetchPodcastsByCategorySortedAndPaged) => {
    const result = await getPodcastsByCategorySortedAndPaged({
      offset,
      sortBy,
      pageSize,
      categories,
    });

    return result;
  }
);
