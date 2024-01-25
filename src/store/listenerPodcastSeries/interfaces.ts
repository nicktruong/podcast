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

export interface ListenerPodcastState extends PopulatedPodcastSections {
  loading: LoadingPodcast;
  fetched: DownloadedPodcast;
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
