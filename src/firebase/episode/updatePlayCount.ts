import { doc, increment, updateDoc } from "firebase/firestore";

import { Collections } from "@/enums";

import { db } from "../init";

import type { PodcastEpisodeIdPair } from "@/common/interfaces";

export const updatePlayCount = async ({
  episodeId,
  podcastId,
}: PodcastEpisodeIdPair) => {
  // update podcast to +1 playCount
  const podcastRef = doc(db, Collections.PODCASTS, podcastId);
  await updateDoc(podcastRef, { playCount: increment(1) });

  // update episode to +1 playCount
  const episodeRef = doc(db, Collections.EPISODES, episodeId);
  await updateDoc(episodeRef, { playCount: increment(1) });
};
