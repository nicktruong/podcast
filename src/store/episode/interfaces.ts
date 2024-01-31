import { EPISODE_CREATION_STEPS } from "@/common/enums";

import type {
  PopulatedEpisode,
  EpisodeCreationData,
} from "@/common/interfaces";

export interface EpisodeState {
  uploading: boolean;
  loadingEpisodes: boolean;
  episodes: PopulatedEpisode[];
  uploadStep: EPISODE_CREATION_STEPS;
  audioUploadProgressInPercent: number;
  episodeCreationData: EpisodeCreationData;
}

export interface FetchEpisodesFromCreatorOptions {
  offset?: Date;
  creatorId: string;
  pageSize?: number;
}
