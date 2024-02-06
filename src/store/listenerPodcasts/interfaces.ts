import type {
  SectionKeys,
  PopulatedPodcast,
  PopulatedPodcastWithAuthor,
} from "@/common/interfaces";

interface LoadingPodcast extends Record<SectionKeys, boolean> {}

interface DownloadedPodcast extends Record<SectionKeys, boolean> {}

interface PopulatedPodcastSections
  extends Record<SectionKeys, PopulatedPodcastWithAuthor[]> {}

export interface ListenerPodcastsState extends PopulatedPodcastSections {
  loading: LoadingPodcast;
  fetched: DownloadedPodcast;
  loadingStandoutPodcast: boolean;
  standoutPodcast: PopulatedPodcast | null;
}

export interface FetchPodcastsOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  userHistory: string[];
  offset?: number;
  pageSize?: number;
}
