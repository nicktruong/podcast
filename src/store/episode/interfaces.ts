import { EpisodeCreationSteps } from "@/common/enums";

import type {
  EpisodeCreationData,
  PopulatedEpisode,
} from "@/common/interfaces";

export interface EpisodeState {
  episodes: PopulatedEpisode[];
  uploading: boolean;
  loadingEpisodes: boolean;
  uploadStep: EpisodeCreationSteps;
  audioUploadProgressInPercent: number;
  episodeCreationData: EpisodeCreationData;
}
