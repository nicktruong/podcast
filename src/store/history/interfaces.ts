import type { PopulatedPodcast } from "@/common/interfaces";

export interface HistoryState {
  history: PopulatedPodcast[];
}

export interface PodcastUserIdPair {
  userId: string;
  podcastId: string;
}
