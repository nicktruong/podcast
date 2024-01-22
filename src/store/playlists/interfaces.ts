import { Playlist } from "@/common/interfaces";

export interface PlaylistsState {
  playlists: Playlist[];
  loadingPlaylists: boolean;
}
