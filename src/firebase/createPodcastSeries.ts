import {
  doc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";
import { getAllPodcastsOfCreator } from "./getAllPodcastsOfCreator";

import type { PodcastSeries } from "@/common/interfaces";

export const createPodcastSeries = async (
  data: PodcastSeries,
  userId: string
) => {
  // create podcast series
  const docRef = await addDoc(collection(db, Collections.PODCAST_SERIES), {
    coverUrl: data.coverUrl,
    title: data.title,
    description: data.description,
    category: data.category,
    rating: data.rating,
    playCount: data.playCount,
    audienceSize: data.audienceSize,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // create creatorsPodcastSeries
  await addDoc(collection(db, Collections.CREATORS_PODCAST_SERIES), {
    creatorId: doc(db, Collections.USERS, userId),
    seriesId: doc(db, Collections.PODCAST_SERIES, docRef.id),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // update all pocasts belong to this user without seriesId to have this seriesID
  const podcasts = await getAllPodcastsOfCreator(userId);

  if (podcasts) {
    await Promise.all(
      podcasts.map((podcast) => {
        if (!podcast.seriesId) {
          return updateDoc(doc(db, Collections.PODCASTS, podcast.id), {
            seriesId: docRef.id,
          });
        }
      })
    );
  }
};
