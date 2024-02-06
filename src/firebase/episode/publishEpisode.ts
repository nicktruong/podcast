import {
  doc,
  addDoc,
  getDoc,
  increment,
  updateDoc,
  collection,
} from "firebase/firestore";

import { Collections, PodcastStatus } from "@/enums";

import { db } from "../init";

import type {
  Episode,
  Podcast,
  EpisodeCreationData,
} from "@/common/interfaces";

export const publishEpisode = async (
  data: EpisodeCreationData,
  authorId: string,
  podcastId: string
): Promise<Episode | undefined> => {
  const podcastSnapshot = await getDoc(
    doc(db, Collections.PODCASTS, podcastId)
  );

  const podcast = podcastSnapshot.data() as Podcast | undefined;

  if (!podcast) return;

  const currentDate = new Date().toISOString();

  await updateDoc(doc(db, Collections.USERS, authorId), {
    updatedAt: currentDate,
    episodeCount: increment(1),
  });

  await updateDoc(doc(db, Collections.PODCASTS, podcastId), {
    updatedAt: currentDate,
    noOfEpisodes: increment(1),
  });

  // Create new episode
  const newEpisode: Omit<Episode, "id"> = {
    authorId,
    podcastId,
    rating: null,
    playCount: 0,
    rateCount: 0,
    audienceSize: 0,
    updatedAt: currentDate,
    createdAt: currentDate,
    publishedDate: currentDate,
    no: podcast.noOfEpisodes + 1,
    status: PodcastStatus.PUBLISHED,
    ...data,
  };

  const docRef = await addDoc(collection(db, Collections.EPISODES), newEpisode);

  return { id: docRef.id, ...newEpisode };
};
