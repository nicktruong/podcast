import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

export const selectEpisodeId = (state: RootState) => state.details.episodeId;

export const selectPodcastDetail = (state: RootState) =>
  state.details.podcastDetail;

export const selectLoadingPodcastDetail = (state: RootState) =>
  state.details.loadingPodcast;

export const selectEpisodesDetail = (state: RootState) =>
  state.details.episodesDetail;

export const selectLoadingEpisodesDetail = (state: RootState) =>
  state.details.loadingEpisodes;

export const selectEpisodeDetail = createSelector(
  [selectEpisodesDetail, (state: RootState, episodeId: string) => episodeId],
  (episodesDetail, episodeId) =>
    episodesDetail.find((episode) => episode.id === episodeId)
);
