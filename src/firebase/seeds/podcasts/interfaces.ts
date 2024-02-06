export interface CreateRandomPodcastOptions {
  index: number;
  rating: number;
  authorId: string;
  rateCount: number;
  playCount: number;
  episodeCount: number;
  audienceSize: number;
}

export interface CreateRandomEpisodeOptions {
  no: number;
  index: number;
  authorId: string;
  podcastId: string;
}
