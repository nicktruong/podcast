import { EpisodeCreationSteps } from "@/enums";

import type {
  PopulatedEpisode,
  EpisodeCreationData,
} from "@/common/interfaces";

export interface EpisodeState {
  uploading: boolean;
  loadingEpisodes: boolean;
  episodes: PopulatedEpisode[];
  uploadStep: EpisodeCreationSteps;
  audioUploadProgressInPercent: number;
  episodeCreationData: EpisodeCreationData;
}

export interface FetchEpisodesFromCreatorOptions {
  creatorId: string;
  offset?: Date;
  pageSize?: number;
}
