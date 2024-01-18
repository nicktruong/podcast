import { PodcastSeriesDetail } from "@/common/interfaces/PodcastSeries";

export interface DownloadAndPlayAudioReturnType {
  audioUrl: string;
  episodeId: string;
  seriesDetail: PodcastSeriesDetail;
}

export interface DownloadAndPlayAudioParameters {
  episodeId: string;
  pathToFile: string;
}
