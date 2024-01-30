import type { RootState } from "@/store";

export const selectEpisodesAreLoading = (state: RootState) =>
  state.pod.loadingEpisodes;

export const selectEpisodeInfo = (state: RootState) =>
  state.pod.episodeCreationData;

export const selectProgress = (state: RootState) =>
  state.pod.audioUploadProgressInPercent;

export const selectPods = (state: RootState) => state.pod.episodes;

export const selectUploading = (state: RootState) => state.pod.uploading;

export const selectUploadStep = (state: RootState) => state.pod.uploadStep;

export const selectEpisodesOfCreator = (state: RootState) => state.pod.episodes;
