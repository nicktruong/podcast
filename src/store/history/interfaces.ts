import type { PopulatedPodcastWithAuthor } from "@/common/interfaces";

export interface HistoryState {
  history: PopulatedPodcastWithAuthor[];
}

export interface PodcastUserIdPair {
  userId: string;
  podcastId: string;
}
