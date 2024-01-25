import { PopulatedPodcast } from "@/common/interfaces";

export interface ListenerPodcastState {
  loading: {
    trendings?: boolean;
    podcastsToTry?: boolean;
    recentlyPlayed?: boolean;
    podcastsForYou?: boolean;
    podcastsOfCategory?: boolean;
  };
  trendings: PopulatedPodcast[];
  podcastsToTry: PopulatedPodcast[];
  podcastsForYou: PopulatedPodcast[];
  recentlyPlayed: PopulatedPodcast[];
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
