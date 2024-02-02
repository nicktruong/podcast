import type { User } from "./User";
import type { Episode } from "./Episode";
import type { Podcast } from "./Podcast";

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
  playlistId: string;
  episode: PlaylistEpisode;
}

export interface PlaylistEpisode {
  podcastId: string;
  episodeId: string;
  addedDate: string;
}

export interface PopulatedPlaylistEpisode extends Episode {
  addedDate: string;
  podcast: Podcast & {
    author: User;
  };
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
