import {
  addDoc,
  collection,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";

import { Episode, EpisodeCreationData } from "@/common/interfaces";
import { COLLECTIONS, PodcastStatus } from "@/common/enums";

import { db } from "../init";

export const publishEpisode = async (
  data: EpisodeCreationData,
  authorId: string,
  podcastId: string
) => {
  const currentDate = new Date().toISOString();

  const newEpisode: Omit<Episode, "id"> = {
    authorId,
    podcastId,
    playCount: 0,
    rateCount: 0,
    rating: null,
    audienceSize: 0,
    updatedAt: currentDate,
    createdAt: currentDate,
    publishedDate: currentDate,
    status: PodcastStatus.PUBLISHED,
    ...data,
  };

  await updateDoc(doc(db, COLLECTIONS.USERS, authorId), {
    episodeCount: increment(1),
  });

  const docRef = await addDoc(collection(db, COLLECTIONS.EPISODES), newEpisode);

  return { id: docRef.id, ...newEpisode };
};
