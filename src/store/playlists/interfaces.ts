import type { Playlist, PopulatedPlaylistEpisode } from "@/common/interfaces";

export interface PlaylistsState {
  playlists: Playlist[];
  loadingEpisodes: boolean;
  loadingPlaylists: boolean;
  episodes: PopulatedPlaylistEpisode[];
}
