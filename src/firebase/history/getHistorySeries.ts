import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Podcast, PopulatedPodcast } from "@/common/interfaces";

import { db } from "../init";
import { populatePodcast } from "../utils";

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
    snapshots.map((snapshot) =>
      populatePodcast({ id: snapshot.id, ...snapshot.data() } as Podcast)
    )
  );

  return podcasts;
};
