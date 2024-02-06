import { User } from "./User";
import { Episode } from "./Episode";

export interface Podcast {
  id: string;
  title: string;
  random: string;
  authorId: string;
  category: string;
  coverUrl: string;
  createdAt: string;
  playCount: number;
  rateCount: number;
  updatedAt: string;
  // keywords: string[];
  description: string;
  noOfEpisodes: number;
  audienceSize: number;
  rating: null | number;
}

export interface PodcastBasicInfo {
  title: string;
  category: string;
  description: string;
}

export interface PodcastCreationData extends PodcastBasicInfo {
  authorId: string;
  coverUrl: string;
}

export interface PopulatedPodcastWithAuthor extends Podcast {
  author: User;
}

export interface PopulatedPodcast extends PopulatedPodcastWithAuthor {
  episodes: Episode[];
}

export interface GetRecentlyPlayedPodcastsOptions {
  offset?: number;
  pageSize?: number;
  history?: string[];
}

export interface PodcastEpisodeIdPair {
  episodeId: string;
  podcastId: string;
}

export interface GetEpisodesFromCreatorPagedOptions {
  creatorId: string;
  offset?: Date;
  pageSize?: number;
}

export interface GetPodcastsByCategoriesOption {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offset: any;
  sortBy?: string;
  pageSize?: number;
  categories?: string[];
}
