import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Podcast, PopulatedPodcast } from "@/common/interfaces";

import { db } from "../init";
import { populatePodcast } from "../utils";
import { downloadFileFromStorage } from "../storage";

export const getRecentlyPlayedPodcastsPaged = async ({
  offset = 0,
  history = [],
  pageSize = 7,
}: {
  offset?: number;
  pageSize?: number;
  history?: string[];
}): Promise<PopulatedPodcast[]> => {
  history = history.slice(offset, offset + pageSize);

  const snapshots = await Promise.all(
    history.map(async (podcastId) =>
      getDoc(doc(db, COLLECTIONS.PODCASTS, podcastId))
    )
  );

  const podcasts = await Promise.all(
    snapshots.map(async (snapshot) => {
      const podcast = { id: snapshot.id, ...snapshot.data() } as Podcast;

      if (!podcast.coverUrl.startsWith("https")) {
        podcast.coverUrl = await downloadFileFromStorage(podcast.coverUrl);
      }

      return populatePodcast(podcast);
    })
  );

  return podcasts;
};
