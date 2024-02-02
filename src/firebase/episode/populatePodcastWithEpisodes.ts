import {
  limit,
  query,
  where,
  getDocs,
  orderBy,
  collection,
} from "firebase/firestore";

import { COLLECTIONS, EPISODE_FIELDS } from "@/common/enums";

import { db } from "../init";
import { downloadFile } from "../storage";

import type { Episode, Podcast } from "@/common/interfaces";

export const populatePodcastWithEpisodes = async (
  podcastToPopulate: Podcast
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

      if (episode.pathToImgFile && !episode.pathToImgFile.startsWith("https")) {
        episode.pathToImgFile = await downloadFile(episode.pathToImgFile);
      }

      return episode;
    })
  );

  return {
    ...podcastToPopulate,
    episodes,
  };
};
