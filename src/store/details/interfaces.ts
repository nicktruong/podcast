import type { Episode, PopulatedPodcastWithAuthor } from "@/common/interfaces";

export interface DetailsState {
  episodeId: string;
  loadingPodcast: boolean;
  loadingEpisodes: boolean;
  episodesDetail: Episode[];
  podcastDetail: PopulatedPodcastWithAuthor | null;
}

export interface SelectHeaderDetailOptions {
  path: string;
  id?: string;
}
