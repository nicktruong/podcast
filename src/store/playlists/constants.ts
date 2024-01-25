import { PlaylistsState } from "./interfaces";

export const initialState: PlaylistsState = {
  episodes: [],
  playlists: [],
  loadingEpisodes: false,
  loadingPlaylists: false,
};

export const SLICE_NAME = "playlists";

export const ADD_TO_PLAYLIST_ACTION = `${SLICE_NAME}/addToPlaylist`;

export const CREATE_PLAYLIST_ACTION = `${SLICE_NAME}/createPlaylist`;

export const FETCH_USER_PLAYLIST_ACTION = `${SLICE_NAME}/fetchUserPlaylists`;

export const REMOVE_PODCAST_FROM_PLAYLIST_ACTION = `${SLICE_NAME}/removePodcastFromPlaylist`;

export const FETCH_USER_PLAYLIST_EPISODES_DETAIL_ACTION = `${SLICE_NAME}/fetchUserPlaylistEpisodesDetail`;
