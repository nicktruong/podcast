import { PodcastStatus } from "../enums";

import { PodcastSeriesWithAuthor } from "./PodcastSeries";

export interface Podcast {
  id: string;
  title: string;
  rating: number;
  seriesId: string;
  rateCount: number;
  playCount: number;
  status: PodcastStatus;
  createdAt: string; // in ISO format
  updatedAt: string; // in ISO format
  pathToFile: string;
  description: string;
  publishedDate: string; // in ISO format
}

export interface PodcastWithSeriesAndAuthor extends Podcast {
  series: PodcastSeriesWithAuthor;
}
