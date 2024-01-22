import { PodcastSeriesDetail } from "@/common/interfaces";

export interface DetailsState {
  loadingDetail: boolean;
  episodeDetailId: string;
  seriesDetail: PodcastSeriesDetail;
}
