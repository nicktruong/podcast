import { doc, getDoc } from "firebase/firestore";

import { User, Podcast, PopulatedPodcastWithAuthor } from "@/common/interfaces";
import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

export const populatePodcastWithAuthor = async (
  podcast: Podcast
): Promise<PopulatedPodcastWithAuthor> => {
  const authorSnapshot = await getDoc(
    doc(db, COLLECTIONS.USERS, podcast.authorId)
  );

  const author = { id: authorSnapshot.id, ...authorSnapshot.data() } as User;

  return { ...podcast, author };
};
