import { Episode } from "./Episode";
import { User } from "./User";

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
