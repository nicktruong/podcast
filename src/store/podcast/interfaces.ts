import { PodcastCreationSteps } from "@/enums";

import type { Podcast, PodcastCreationData } from "@/common/interfaces";

export interface PodcasterManagePodcastState {
  tempImg: string;
  loading: boolean;
  podcast: Podcast | null;
  step: PodcastCreationSteps;
  podcastCreationData: PodcastCreationData | null;
}
