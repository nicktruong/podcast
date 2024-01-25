import { doc, getDoc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Episode, Podcast } from "@/common/interfaces";

import { db } from "../init";

export const updatePlayCount = async ({
  episodeId,
  podcastId,
}: {
  episodeId: string;
  podcastId: string;
}) => {
  // update podcast to +1 playCount
  const podcastRef = doc(db, COLLECTIONS.PODCASTS, podcastId);
  const podcastSnapshot = await getDoc(podcastRef);
  const podcast = podcastSnapshot.data() as Podcast;
  await updateDoc(podcastRef, { playCount: podcast.playCount + 1 });

  // update episode to +1 playCount
  const episodeRef = doc(db, COLLECTIONS.EPISODES, episodeId);
  const episodeSnapshot = await getDoc(episodeRef);
  const episode = episodeSnapshot.data() as Episode;
  await updateDoc(episodeRef, { playCount: episode.playCount + 1 });
};
