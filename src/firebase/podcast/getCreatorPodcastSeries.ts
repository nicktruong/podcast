import { collection, getDocs, query, where } from "firebase/firestore";

import { Podcast } from "@/common/interfaces";
import { COLLECTIONS, PODCAST_FIELDS } from "@/common/enums";

import { db } from "../init";
import { downloadFileFromStorage } from "../storage";

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

  console.log(podcast.coverUrl);

  if (!podcast.coverUrl.startsWith("https")) {
    podcast.coverUrl = await downloadFileFromStorage(podcast.coverUrl);
  }

  return podcast;
};
