import { EpisodeCreationSteps } from "@/common/enums";

import type { Episode, EpisodeCreationData } from "@/common/interfaces";

export interface EpisodeState {
  episodes: Episode[];
  uploading: boolean;
  loadingEpisodes: boolean;
  uploadStep: EpisodeCreationSteps;
  audioUploadProgressInPercent: number;
  episodeCreationData: EpisodeCreationData;
}
