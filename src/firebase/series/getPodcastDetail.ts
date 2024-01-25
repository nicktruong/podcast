import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Podcast, User } from "@/common/interfaces";

import { db } from "../init";
import { downloadFileFromStorage } from "../storage";

export const getPodcastDetail = async (podcastId: string) => {
  // podcast
  const podcastSnapshot = await getDoc(
    doc(db, COLLECTIONS.PODCASTS, podcastId)
  );

  const podcast = {
    id: podcastSnapshot.id,
    ...podcastSnapshot.data(),
  } as Podcast;

  if (!podcast.coverUrl.startsWith("https")) {
    podcast.coverUrl = await downloadFileFromStorage(podcast.coverUrl);
  }

  // author
  const authorSnapshot = await getDoc(
    doc(db, COLLECTIONS.USERS, podcast.authorId)
  );

  const author = { id: authorSnapshot.id, ...authorSnapshot.data() } as User;

  return { ...podcast, author };
};
