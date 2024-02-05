import { collection, getDocs, query, where } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { PODCAST_FIELDS } from "@/common/fields";

import { db } from "../init";
import { downloadFile } from "../storage";

import type { Podcast } from "@/common/interfaces";

export const getSinglePodcastOfCreatorId = async (creatorId: string) => {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.PODCASTS),
      where(PODCAST_FIELDS.AUTHOR_ID, "==", creatorId)
    )
  );

  // TODO: Support multiple series
  const podcastDoc = snapshot.docs[0];

  if (!podcastDoc) {
    return;
  }

  const podcast = { ...podcastDoc.data(), id: podcastDoc.id } as Podcast;

  if (!podcast.coverUrl.startsWith("https")) {
    podcast.coverUrl = await downloadFile(podcast.coverUrl);
  }

  return podcast;
};
