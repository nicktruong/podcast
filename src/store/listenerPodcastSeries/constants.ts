import { UserPodcastSeriesState } from "./interfaces";

export const initialState: UserPodcastSeriesState = {
  seriesToTry: [], // random shows
  seriesForYou: [], // based on categories of interests, users can choose initially, and the platform will personalized based on users listen history
  recentlyPlayed: [], // when implement history
  trendingSeries: [], // in the beginning, where we don't have any data other than playCount, we use playCount as the primary metric to decide the trending scale of one podcast
  categoriesSeries: [],
};

export const SLICE_NAME = "listenerPodcastSeries";

export const FETCH_SERIES_BY_CATEGORY_SORTED_AND_PAGED_TYPE = `${SLICE_NAME}/fetchCategoriesSeries`;
export const FETCH_RECENTLY_PLAYED_SERIES_TYPE = `${SLICE_NAME}/fetchRecentlyPlayedSeries`;
export const FETCH_TRENDING_SERIES_PAGED_TYPE = `${SLICE_NAME}/fetchTrendingSeriesPaged`;
export const FETCH_SERIES_FOR_YOU_PAGED_TYPE = `${SLICE_NAME}/fetchSeriesForYouPaged`;
export const FETCH_SERIES_TO_TRY_PAGED_TYPE = `${SLICE_NAME}/fetchSeriesToTryPaged`;
