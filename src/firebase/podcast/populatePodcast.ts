import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { COLLECTIONS, EPISODE_FIELDS } from "@/common/enums";
import { Episode, PopulatedPodcastWithAuthor } from "@/common/interfaces";

import { db } from "../init";
import { downloadFileFromStorage } from "../storage";

export const populatePodcast = async (
  podcastToPopulate: PopulatedPodcastWithAuthor
) => {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.EPISODES),
      where(EPISODE_FIELDS.PODCAST_ID, "==", podcastToPopulate.id),
      orderBy(EPISODE_FIELDS.NO, "desc"),
      orderBy(EPISODE_FIELDS.CREATED_AT, "desc"),
      limit(3)
    )
  );

  const episodes = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const episode = { id: doc.id, ...doc.data() } as Episode;

      if (!episode.pathToFile.startsWith("https")) {
        episode.pathToFile = await downloadFileFromStorage(episode.pathToFile);
      }

      return episode;
    })
  );

  return {
    ...podcastToPopulate,
    episodes,
  };
};
