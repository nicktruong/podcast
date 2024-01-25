export interface PlaylistCreationData {
  title: string;
  userId: string;
  coverUrl: string;
  episodeId: string;
  podcastId: string;
}

export interface AddToPlaylistData {
  episodeId: string;
  podcastId: string;
  playlistId: string;
}

export interface EpisodeReference {
  episodeId: string;
  playlistId: string;
}

export interface PlaylistEpisode {
  podcastId: string;
  episodeId: string;
  addedDate: string;
}

export interface Playlist {
  id: string;
  title: string;
  userId: string;
  coverUrl: string;
  createdAt: string;
  updatedAt: string;
  episodes: PlaylistEpisode[];
}
