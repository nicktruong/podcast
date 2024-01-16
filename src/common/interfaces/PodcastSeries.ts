import { User } from "./user.interface";

export interface PodcastSeries {
  id: string;
  title: string;
  rating: number;
  coverUrl: string; // ref or https
  playCount: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  description: string;
  audienceSize: number;
}

export interface PodcastSeriesWithAuthor extends PodcastSeries {
  author?: User;
}
