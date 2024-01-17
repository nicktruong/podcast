import { Pod } from "./pod.interface";
import { User } from "./user.interface";

export interface PodcastSeries {
  id: string;
  title: string;
  rating: number;
  coverUrl: string; // ref or https
  playCount: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  description: string;
  audienceSize: number;
}

export interface PodcastSeriesWithAuthor extends PodcastSeries {
  author?: User;
}

export interface PodcastSeriesDetail extends PodcastSeriesWithAuthor {
  podcasts: Pod[];
}
