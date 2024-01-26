import { doc, getDoc } from "firebase/firestore";

import {
  User,
  Episode,
  Podcast,
  PopulatedEpisode,
  PopulatedPodcast,
} from "@/common/interfaces";
import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";
import { downloadFileFromStorage } from "../storage";

export const populatePodcast = async (
  podcast: Podcast
): Promise<PopulatedPodcast> => {
  const authorSnapshot = await getDoc(
    doc(db, COLLECTIONS.USERS, podcast.authorId)
  );

  const author = { id: authorSnapshot.id, ...authorSnapshot.data() } as User;

  return { ...podcast, author };
};

export const populateEpisode = async (
  episode: Episode
): Promise<PopulatedEpisode> => {
  // Populate podcast
  const podcastSnapshot = await getDoc(
    doc(db, COLLECTIONS.PODCASTS, episode.podcastId)
  );

  const podcast = {
    id: podcastSnapshot.id,
    ...podcastSnapshot.data(),
  } as Podcast;

  if (!podcast.coverUrl.startsWith("https")) {
    podcast.coverUrl = await downloadFileFromStorage(podcast.coverUrl);
  }

  // Populate author
  const authorSnapshot = await getDoc(
    doc(db, COLLECTIONS.USERS, episode.authorId)
  );
  const author = { id: authorSnapshot.id, ...authorSnapshot.data() } as User;

  return { ...episode, podcast: { ...podcast, author } };
};
