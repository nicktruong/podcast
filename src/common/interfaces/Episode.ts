import type { User } from "./User";
import type { Podcast } from "./Podcast";
import type { PodcastStatus } from "../../enums";

export interface Episode {
  id: string;
  no: number;
  title: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  rateCount: number;
  playCount: number;
  podcastId: string;
  // keywords: string[];
  pathToFile: string;
  description: string;
  audienceSize: number;
  pathToImgFile: string;
  rating: number | null;
  publishedDate: string;
  status: PodcastStatus;
}

export interface EpisodeBasicCreationData {
  title: string;
  description: string;
}

export interface EpisodeCreationData extends EpisodeBasicCreationData {
  pathToFile: string;
  pathToImgFile: string;
}

export type PopulatedEpisode = Omit<Episode, "podcastId"> & {
  podcast: Omit<Podcast, "authorId"> & {
    author: User;
  };
};
