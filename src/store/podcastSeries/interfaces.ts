import { SeriesCreationSteps } from "@/common/enums";

import type { PodcastSeries } from "@/common/interfaces";

export interface PodSeriesState {
  image?: string;
  loading: boolean;
  hasPodSeries: boolean;
  step: SeriesCreationSteps;
  podSeries: PodcastSeries;
}
