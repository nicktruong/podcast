import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Podcast, User } from "@/common/interfaces";

import { db } from "../init";

export const getPodcastAuthor = async ({
  podcastId,
}: {
  podcastId: string;
}) => {
  const podcastSnapshot = await getDoc(
    doc(db, COLLECTIONS.PODCASTS, podcastId)
  );
  const podcast = podcastSnapshot.data() as Podcast;

  const authorSnapshot = await getDoc(
    doc(db, COLLECTIONS.USERS, podcast.authorId)
  );

  return authorSnapshot.data() as User;
};
