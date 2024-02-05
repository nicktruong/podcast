import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type {
  User,
  Podcast,
  PopulatedPodcastWithAuthor,
} from "@/common/interfaces";

export const populatePodcastWithAuthor = async (
  podcast: Podcast
): Promise<PopulatedPodcastWithAuthor | undefined> => {
  const authorSnapshot = await getDoc(
    doc(db, COLLECTIONS.USERS, podcast.authorId)
  );

  if (!authorSnapshot.exists()) return;

  const author = { id: authorSnapshot.id, ...authorSnapshot.data() } as User;

  return { ...podcast, author };
};
