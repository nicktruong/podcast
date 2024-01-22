import { PodcastWithSeriesAndAuthor } from "./Podcast";

export interface PlaylistRaw {
  id: string;
  title: string;
  userId: string;
  coverUrl: string;
  podcasts: { seriesId: string; podcastId: string }[];
}

export type Playlist = Omit<PlaylistRaw, "podcasts"> & {
  podcasts: PodcastWithSeriesAndAuthor[];
};
