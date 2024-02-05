import type { Collections } from "../enums";

export interface Rating {
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  podcastOrSeriesId: string;
}

export interface RateOptions {
  userId: string;
  rating: number;
  podcastOrSeriesId: string;
  type: typeof Collections.PODCASTS | typeof Collections.EPISODES;
}

export interface NewRate {
  newRating: number;
  newRateCount: number;
}

export interface GetUserRatingOptions {
  userId: string;
  podcastOrSeriesId: string;
}
