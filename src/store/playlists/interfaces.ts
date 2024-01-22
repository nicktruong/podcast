import { Playlist } from "@/common/interfaces/Playlist";

export interface PlaylistsState {
  playlists: Playlist[];
  loadingPlaylists: boolean;
}
