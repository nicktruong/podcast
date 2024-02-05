import { doc, increment, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { PodcastEpisodeIdPair } from "@/common/interfaces";

export const updatePlayCount = async ({
  episodeId,
  podcastId,
}: PodcastEpisodeIdPair) => {
  // update podcast to +1 playCount
  const podcastRef = doc(db, COLLECTIONS.PODCASTS, podcastId);
  await updateDoc(podcastRef, { playCount: increment(1) });

  // update episode to +1 playCount
  const episodeRef = doc(db, COLLECTIONS.EPISODES, episodeId);
  await updateDoc(episodeRef, { playCount: increment(1) });
};
