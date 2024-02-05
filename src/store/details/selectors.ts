import { createSelector } from "@reduxjs/toolkit";

import { selectUser } from "../user";
import { selectPlaylists } from "../playlists";

import type { RootState } from "@/store";
import type { SelectHeaderDetailOptions } from "./interfaces";

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

export const selectLoadingDetail = createSelector(
  [selectLoadingPodcastDetail, selectLoadingEpisodesDetail],
  (podcastLoading, episodesLoading) => podcastLoading || episodesLoading
);

// TODO: Refactor detailsSlice & playlistsSlice

export const selectHeaderDetail = createSelector(
  [
    selectUser,
    selectPlaylists,
    selectPodcastDetail,
    selectEpisodesDetail,
    (state: RootState, { path, id }: SelectHeaderDetailOptions) => ({
      id,
      path,
    }),
  ],
  (user, playlists, podcastDetail, episodesDetail, { id, path }) => {
    if (path.includes("user-playlist")) {
      const playlist = playlists.find((playlist) => playlist.id === id);

      return {
        title: playlist?.title,
        authorName: user?.name,
        coverUrl: playlist?.coverUrl,
      };
    }

    const headerDetail = {
      title: podcastDetail?.title,
      coverUrl: podcastDetail?.coverUrl,
      authorName: podcastDetail?.author.name,
    };

    if (path.includes("playlist")) {
      return headerDetail;
    }

    const episode = episodesDetail.find((episode) => episode.id === id);

    headerDetail.title = episode?.title;
    headerDetail.coverUrl = episode?.pathToImgFile;

    return headerDetail;
  }
);
