import { PodcastSeriesWithAuthor } from "@/common/interfaces";

import { getSeriesById } from "../series";

export const getHistorySeries = async (history: string[]) => {
  const series = await Promise.all(
    history.map((seriesId) => getSeriesById({ seriesId }))
  );

  return series as PodcastSeriesWithAuthor[];
};
