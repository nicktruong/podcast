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
  description: string;
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

export interface PopulatedPodcast extends Podcast {
  author: User;
}

export interface PodcastDetail extends PopulatedPodcast {
  podcasts: Episode[];
}
