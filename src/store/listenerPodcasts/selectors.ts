import type { RootState } from "@/store";

export const selectRecentlyPlayed = (state: RootState) =>
  state.userPodcasts.recentlyPlayed;

export const selectTrendingPodcasts = (state: RootState) =>
  state.userPodcasts.trendingPodcasts;

export const selectPodcastsForYou = (state: RootState) =>
  state.userPodcasts.podcastsForYou;

export const selectPodcastsToTry = (state: RootState) =>
  state.userPodcasts.podcastsToTry;

export const selectCategoriesSeries = (state: RootState) =>
  state.userPodcasts.podcastsOfCategory;

export const selectIsLoadingListenerPodcasts = (state: RootState) =>
  state.userPodcasts.loading;

export const selectListenerPodcastsFetched = (state: RootState) =>
  state.userPodcasts.fetched;

export const selectStandOutPodcast = (state: RootState) =>
  state.userPodcasts.standoutPodcast;

export const selectLoadingStandoutPodcast = (state: RootState) =>
  state.userPodcasts.loadingStandoutPodcast;
