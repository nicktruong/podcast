import { PODCAST_STATUS } from "../enums";

import { User } from "./User";
import { Podcast, PopulatedPodcast } from "./Podcast";

export interface Episode {
  id: string;
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
  rating: number | null;
  publishedDate: string;
  status: PODCAST_STATUS;
}

export interface EpisodeBasicCreationData {
  title: string;
  description: string;
}

export interface EpisodeCreationData extends EpisodeBasicCreationData {
  pathToFile: string;
}

export type PopulatedEpisode = Omit<Episode, "podcastId"> & {
  podcast: Omit<Podcast, "authorId"> & {
    author: User;
  };
};

export interface EpisodeWithSeriesAndAuthor extends Episode {
  series: PopulatedPodcast;
}

export interface PlaylistEpisodes extends Episode {
  addedDate: string;
  series: PopulatedPodcast;
}
