import { collection, getDocs, query, where } from "firebase/firestore";

import { Collections } from "@/enums";
import { PodcastFields } from "@/firebase/fields";

import { db } from "../init";
import { downloadFile } from "../storage";

import type { Podcast } from "@/common/interfaces";

export const getSinglePodcastOfCreatorId = async (creatorId: string) => {
  const snapshot = await getDocs(
    query(
      collection(db, Collections.PODCASTS),
      where(PodcastFields.AUTHOR_ID, "==", creatorId)
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
