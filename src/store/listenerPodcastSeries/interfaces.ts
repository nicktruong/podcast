import { PodcastSeriesWithAuthor } from "@/common/interfaces";

export interface UserPodcastSeriesState {
  seriesToTry: PodcastSeriesWithAuthor[];
  seriesForYou: PodcastSeriesWithAuthor[];
  recentlyPlayed: PodcastSeriesWithAuthor[];
  trendingSeries: PodcastSeriesWithAuthor[];
  categoriesSeries: PodcastSeriesWithAuthor[];
}

export interface FetchSeriesByCategorySortedAndPaged {
  sortBy?: string;
  pageSize?: number;
  categories?: string[];
}

export interface FetchSeriesByPeriodPaged {
  period?: number;
  pageSize?: number;
}
