import { Episode, PopulatedPodcast } from "@/common/interfaces";

export interface DetailsState {
  episodeId: string;
  loadingPodcast: boolean;
  loadingEpisodes: boolean;
  episodesDetail: Episode[];
  podcastDetail: PopulatedPodcast | null;
}
