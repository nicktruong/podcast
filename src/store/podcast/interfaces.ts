import { PODCAST_CREATION_STEPS } from "@/common/enums";

import type { Podcast, PodcastCreationData } from "@/common/interfaces";

export interface PodcasterManagePodcastState {
  tempImg: string;
  loading: boolean;
  podcast: Podcast | null;
  step: PODCAST_CREATION_STEPS;
  podcastCreationData: PodcastCreationData | null;
}
