import { EpisodeCreationSteps } from "@/common/enums";

import type { CreatorsPodcasts, Podcast } from "@/common/interfaces";

export interface PodcastState {
  pod: Podcast;
  pods: Podcast[];
  uploading: boolean;
  loadingPods: boolean;
  episodesCount: number;
  progressInPercent: number;
  uploadStep: EpisodeCreationSteps;
  creatorsPodcasts: CreatorsPodcasts[];
}
