import { doc, getDoc, updateDoc } from "firebase/firestore";

import {
  PODCASTS,
  PODCAST_SERIES,
} from "@/common/constants/firestoreCollectionNames";
import { Pod } from "@/common/interfaces";
import { PodcastSeries } from "@/common/interfaces/PodcastSeries";

import { db } from "./init";

// TODO: when user listen the audio for more than 60 seconds => +1 playCount
export const updatePlayCount = async ({
  podcastId,
  seriesId,
}: {
  podcastId: string;
  seriesId: string;
}) => {
  // update podcast to +1 playCount
  const podcastRef = doc(db, PODCASTS, podcastId);
  const podcastSnapshot = await getDoc(podcastRef);
  const podcast = podcastSnapshot.data() as Pod;
  await updateDoc(podcastRef, { playCount: podcast.playCount + 1 });
  // update series to +1 playCount
  const seriesRef = doc(db, PODCAST_SERIES, seriesId);
  const seriesSnapshot = await getDoc(seriesRef);
  const series = seriesSnapshot.data() as PodcastSeries;
  await updateDoc(seriesRef, { playCount: series.playCount + 1 });
};
