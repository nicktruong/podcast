import { Podcast } from "./Podcast";

export interface PlaylistRaw {
  id: string;
  title: string;
  userId: string;
  coverUrl: string;
  podcasts: string[];
}

export type Playlist = Omit<PlaylistRaw, "podcasts"> & {
  podcasts: Podcast[];
};
