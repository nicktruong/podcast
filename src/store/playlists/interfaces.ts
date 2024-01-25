import { Playlist, PopulatedEpisode } from "@/common/interfaces";

export interface PlaylistsState {
  playlists: Playlist[];
  loadingEpisodes: boolean;
  loadingPlaylists: boolean;
  episodes: PopulatedEpisode[];
}
