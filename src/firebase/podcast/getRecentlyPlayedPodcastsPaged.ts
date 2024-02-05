import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";
import { downloadFile } from "../storage";

import { populatePodcastWithAuthor } from "./populatePodcastWithAuthor";

import type {
  Podcast,
  PopulatedPodcastWithAuthor,
  GetRecentlyPlayedPodcastsOptions,
} from "@/common/interfaces";

export const getRecentlyPlayedPodcastsPaged = async ({
  offset = 0,
  history = [],
  pageSize = 4,
}: GetRecentlyPlayedPodcastsOptions): Promise<PopulatedPodcastWithAuthor[]> => {
  history = history.slice(offset, offset + pageSize);

  const snapshots = await Promise.all(
    history.map(async (podcastId) =>
      getDoc(doc(db, COLLECTIONS.PODCASTS, podcastId))
    )
  );

  // TODO: move this to another file
  const podcasts = await Promise.all(
    snapshots.map(async (snapshot) => {
      if (!snapshot.exists()) return;

      // TODO: Consider store id to documents on firestore
      const podcast = { id: snapshot.id, ...snapshot.data() } as Podcast;

      if (podcast.coverUrl && !podcast.coverUrl.startsWith("https")) {
        podcast.coverUrl = await downloadFile(podcast.coverUrl);
      }

      return populatePodcastWithAuthor(podcast);
    })
  );

  return podcasts.filter(
    (podcast) => podcast !== undefined
  ) as PopulatedPodcastWithAuthor[];
};
