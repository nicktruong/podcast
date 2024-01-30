import { PopulatedPodcast } from "@/common/interfaces";

type SectionKeys =
  | "trendings"
  | "podcastsToTry"
  | "podcastsForYou"
  | "recentlyPlayed"
  | "podcastsOfCategory";

interface LoadingPodcast extends Record<SectionKeys, boolean> {}

interface DownloadedPodcast extends Record<SectionKeys, boolean> {}

interface PopulatedPodcastSections
  extends Record<SectionKeys, PopulatedPodcast[]> {}

export interface ListenerPodcastsState extends PopulatedPodcastSections {
  loading: LoadingPodcast;
  fetched: DownloadedPodcast;
}

export interface FetchPodcastsByCategorySortedAndPaged {
  offset: any;
  sortBy?: string;
  pageSize?: number;
  categories?: string[];
}

export interface FetchPodcastsOptions {
  offset?: any;
  period?: number;
  pageSize?: number;
}

export interface FetchPodcastsForYouOptions extends FetchPodcastsOptions {
  categories: string[];
  podcastIdsToExclude?: string[];
}

export interface FetchPodcastsToTryOptions extends FetchPodcastsOptions {
  podcastIdsToExclude?: string[];
}

export interface FetchRecentlyPlayedPodcastsOptions {
  offset?: number;
  pageSize?: number;
  userHistory: string[];
}
