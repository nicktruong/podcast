import {
  doc,
  addDoc,
  Timestamp,
  collection,
  serverTimestamp,
} from "@firebase/firestore";

import { Collections, PodcastStatus } from "@/common/enums";

import { db } from "./init";

import type { Podcast } from "@/common/interfaces";

export const publishPod = async (podcast: Podcast, userId: string) => {
  // create pod document
  const docRef = await addDoc(collection(db, Collections.PODCASTS), {
    title: podcast.title,
    rating: null, // change when podcast get first rating
    seriesId: null, // change when user first create series
    playCount: 0,
    status: PodcastStatus.PUBLISHED, // TODO: support draft and pending publish when add new functionalities
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    pathToFile: podcast.pathToFile,
    description: podcast.description,
    publishedDate: Timestamp.fromDate(new Date(podcast.publishedDate)),
  });

  const creatorsPodcasts = {
    creatorId: doc(db, "users", userId),
    podcastId: doc(db, "podcasts", docRef.id),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // create creatorsPodcasts document
  await addDoc(collection(db, Collections.CREATORS_PODCASTS), creatorsPodcasts);

  return {
    creatorId: creatorsPodcasts.creatorId.path,
    podcastId: creatorsPodcasts.podcastId.path,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
