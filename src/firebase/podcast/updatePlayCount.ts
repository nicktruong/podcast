import { doc, getDoc, updateDoc } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

import type { Podcast, PodcastSeries } from "@/common/interfaces";

// TODO: when user listen the audio for more than 60 seconds => +1 playCount
export const updatePlayCount = async ({
  podcastId,
  seriesId,
}: {
  podcastId: string;
  seriesId: string;
}) => {
  // update podcast to +1 playCount
  const podcastRef = doc(db, Collections.PODCASTS, podcastId);
  const podcastSnapshot = await getDoc(podcastRef);
  const podcast = podcastSnapshot.data() as Podcast;
  await updateDoc(podcastRef, { playCount: podcast.playCount + 1 });
  // update series to +1 playCount
  const seriesRef = doc(db, Collections.PODCAST_SERIES, seriesId);
  const seriesSnapshot = await getDoc(seriesRef);
  const series = seriesSnapshot.data() as PodcastSeries;
  await updateDoc(seriesRef, { playCount: series.playCount + 1 });
};
