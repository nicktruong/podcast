import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

import { Episode, EpisodeCreationData, Podcast } from "@/common/interfaces";
import { COLLECTIONS, PODCAST_STATUS } from "@/common/enums";

import { db } from "../init";

export const publishEpisode = async (
  data: EpisodeCreationData,
  authorId: string,
  podcastId: string
) => {
  const currentDate = new Date().toISOString();

  const podcastSnapshot = await getDoc(
    doc(db, COLLECTIONS.PODCASTS, podcastId)
  );

  const podcast = podcastSnapshot.data() as Podcast;

  const newEpisode: Omit<Episode, "id"> = {
    authorId,
    podcastId,
    // coverUrl: "", // TODO: get coverUrl from data
    playCount: 0,
    rateCount: 0,
    rating: null,
    audienceSize: 0,
    updatedAt: currentDate,
    createdAt: currentDate,
    publishedDate: currentDate,
    no: podcast.noOfEpisodes + 1,
    status: PODCAST_STATUS.PUBLISHED,
    ...data,
  };

  await updateDoc(doc(db, COLLECTIONS.USERS, authorId), {
    episodeCount: increment(1),
  });

  await updateDoc(doc(db, COLLECTIONS.PODCASTS, podcastId), {
    updatedAt: new Date().toISOString(),
  });

  const docRef = await addDoc(collection(db, COLLECTIONS.EPISODES), newEpisode);

  return { id: docRef.id, ...newEpisode };
};
