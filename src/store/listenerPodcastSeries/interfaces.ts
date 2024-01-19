import {
  PodcastSeriesDetail,
  PodcastSeriesWithAuthor,
} from "@/common/interfaces";

export interface UserPodcastSeriesState {
  seriesToTry: PodcastSeriesWithAuthor[];
  seriesForYou: PodcastSeriesWithAuthor[];
  recentlyPlayed: PodcastSeriesWithAuthor[];
  trendingSeries: PodcastSeriesWithAuthor[];
  loadingDetail: boolean;
  seriesDetail: PodcastSeriesDetail;
}
