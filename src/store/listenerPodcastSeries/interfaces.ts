import { PopulatedPodcast } from "@/common/interfaces";

export interface ListenerPodcastState {
  loadingTrendings: boolean;
  loadingPodcastsToTry: boolean;
  trendings: PopulatedPodcast[];
  loadingPodcastsForYou: boolean;
  loadingRecentlyPlayed: boolean;
  podcastsToTry: PopulatedPodcast[];
  podcastsForYou: PopulatedPodcast[];
  recentlyPlayed: PopulatedPodcast[];
  loadingPodcastsOfCategory: boolean;
  podcastsOfCategory: PopulatedPodcast[];
}

export interface FetchPodcastsByCategorySortedAndPaged {
  offset: any;
  sortBy?: string;
  pageSize?: number;
  categories?: string[];
}

export interface FetchPodcastsByPeriodPaged {
  offset?: any;
  period?: number;
  pageSize?: number;
}

export interface FetchRecentlyPlayedPodcastsPaged {
  offset?: number;
  pageSize?: number;
}
