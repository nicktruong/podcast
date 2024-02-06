import { doc, getDoc } from "firebase/firestore";

import { Collections } from "@/enums";

import { db } from "../init";
import { downloadFile } from "../storage";

import type { Podcast, User } from "@/common/interfaces";

export const getPodcastDetail = async (podcastId: string) => {
  // podcast
  const podcastSnapshot = await getDoc(
    doc(db, Collections.PODCASTS, podcastId)
  );

  const podcast = {
    id: podcastSnapshot.id,
    ...podcastSnapshot.data(),
  } as Podcast;

  if (!podcast.coverUrl.startsWith("https")) {
    podcast.coverUrl = await downloadFile(podcast.coverUrl);
  }

  // author
  const authorSnapshot = await getDoc(
    doc(db, Collections.USERS, podcast.authorId)
  );

  const author = { id: authorSnapshot.id, ...authorSnapshot.data() } as User;

  return { ...podcast, author };
};
