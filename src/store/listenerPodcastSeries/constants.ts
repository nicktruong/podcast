import { ListenerPodcastState } from "./interfaces";

const initialLoadingAndFetched = {
  trendings: false,
  podcastsToTry: false,
  recentlyPlayed: false,
  podcastsForYou: false,
  podcastsOfCategory: false,
};

export const initialState: ListenerPodcastState = {
  loading: initialLoadingAndFetched,
  fetched: initialLoadingAndFetched,
  trendings: [], // in the beginning, where we don't have any data other than playCount, we use playCount as the primary metric to decide the trending scale of one podcast
  podcastsToTry: [], // random shows
  podcastsForYou: [], // based on categories of interests, users can choose initially, and the platform will personalized based on users listen history
  recentlyPlayed: [], // when implement history
  podcastsOfCategory: [],
};

export const SLICE_NAME = "listenerPodcastSeries";

export const FETCH_PODCASTS_TO_TRY_PAGED_ACTION = `${SLICE_NAME}/fetchPodcastsToTryPaged`;

export const FETCH_PODCASTS_FOR_YOU_PAGED_ACTION = `${SLICE_NAME}/fetchPodcastsForYouPaged`;

export const FETCH_RECENTLY_PLAYED_PODCASTS_ACTION = `${SLICE_NAME}/fetchRecentlyPlayedSeries`;

export const FETCH_TRENDING_PODCASTS_PAGED_ACTION = `${SLICE_NAME}/fetchTrendingPodcastsPaged`;

export const FETCH_PODCASTS_BY_CATEGORY_SORTED_AND_PAGED_ACTION = `${SLICE_NAME}/fetchPodcastsByCategorySortedAndPaged`;
