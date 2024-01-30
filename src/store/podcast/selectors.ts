import type { RootState } from "@/store";

export const selectLoadingPodcastOfCreator = (state: RootState) =>
  state.podSeries.loading;

export const selectPodcastCreationData = (state: RootState) =>
  state.podSeries.podcastCreationData;

export const selectStep = (state: RootState) => state.podSeries.step;

export const selectPodcast = (state: RootState) => state.podSeries.podcast;

export const selectTempImg = (state: RootState) => state.podSeries.tempImg;
