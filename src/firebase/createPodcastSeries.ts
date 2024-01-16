import {
  doc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  USERS,
  PODCASTS,
  PODCAST_SERIES,
  CREATORS_PODCAST_SERIES,
} from "@/common/constants/firestoreCollectionNames";
import { PodcastSeries } from "@/common/interfaces/PodcastSeries";

import { db } from "./init";
import { getAllCreatorPodcasts } from "./getAllCreatorPodcasts";

export const createPodcastSeries = async (
  data: PodcastSeries,
  userId: string
) => {
  // create podcast series
  const docRef = await addDoc(collection(db, PODCAST_SERIES), {
    coverUrl: data.coverUrl,
    title: data.title,
    description: data.description,
    categoryId: data.categoryId,
    rating: data.rating,
    playCount: data.playCount,
    audienceSize: data.audienceSize,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // create creatorsPodcastSeries
  await addDoc(collection(db, CREATORS_PODCAST_SERIES), {
    creatorId: doc(db, USERS, userId),
    seriesId: doc(db, PODCAST_SERIES, docRef.id),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // update all pocasts belong to this user without seriesId to have this seriesID
  const podcasts = await getAllCreatorPodcasts(userId);

  if (podcasts) {
    await Promise.all(
      podcasts.map((podcast) => {
        if (!podcast.seriesId) {
          return updateDoc(doc(db, PODCASTS, podcast.id), {
            seriesId: docRef.id,
          });
        }
      })
    );
  }
};
