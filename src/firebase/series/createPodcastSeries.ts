import {
  doc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";
import { getAllPodcastsOfCreator } from "../podcast/getAllPodcastsOfCreator";

import type { PodcastSeries } from "@/common/interfaces";

export const createPodcastSeries = async (
  data: PodcastSeries,
  userId: string
) => {
  // create podcast series
  const docRef = await addDoc(collection(db, Collections.PODCAST_SERIES), {
    title: data.title,
    rating: data.rating,
    coverUrl: data.coverUrl,
    category: data.category,
    playCount: data.playCount,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    description: data.description,
    audienceSize: data.audienceSize,
    searchKeywords: data.title.split(" "),
  });

  // create creatorsPodcastSeries
  await addDoc(collection(db, Collections.CREATORS_PODCAST_SERIES), {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    creatorId: doc(db, Collections.USERS, userId),
    seriesId: doc(db, Collections.PODCAST_SERIES, docRef.id),
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
