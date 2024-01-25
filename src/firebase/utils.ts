import { doc, getDoc } from "firebase/firestore";

import { Podcast, PopulatedPodcast, User } from "@/common/interfaces";
import { COLLECTIONS } from "@/common/enums";

import { db } from "./init";

export const populatePodcast = async (
  podcast: Podcast
): Promise<PopulatedPodcast> => {
  const authorSnapshot = await getDoc(
    doc(db, COLLECTIONS.USERS, podcast.authorId)
  );

  const author = { id: authorSnapshot.id, ...authorSnapshot.data() } as User;

  return { ...podcast, author };
};
