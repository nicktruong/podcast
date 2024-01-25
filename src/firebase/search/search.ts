import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { User, Podcast, SearchResult } from "@/common/interfaces";

import { db } from "../init";
import { downloadFileFromStorage } from "../storage";
// import { downloadFileFromStorage } from "../storage";

// TODO: create keywords 5 characters ignore punctuations
export const search = async (searchText: string): Promise<SearchResult> => {
  if (!searchText) {
    return { podcasters: [], podcasts: [] };
  }

  // Podcasters
  const podcastersRef = collection(db, COLLECTIONS.USERS);

  const podcastersSnapshot = await getDocs(
    query(
      podcastersRef,
      where("name", ">=", searchText),
      where("name", "<=", searchText + "\uf8ff")
    )
  );

  const podcasters = podcastersSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as User
  );

  // Podcasts
  const podcastRef = collection(db, COLLECTIONS.PODCASTS);

  const podcastSnapshot = await getDocs(
    query(
      podcastRef,
      where("title", ">=", searchText),
      where("title", "<=", searchText + "\uf8ff")
    )
  );

  const podcasts = await Promise.all(
    podcastSnapshot.docs.map(async (doc) => {
      const podcast = { id: doc.id, ...doc.data() } as Podcast;

      if (!podcast.coverUrl.startsWith("https")) {
        podcast.coverUrl = await downloadFileFromStorage(podcast.coverUrl);
      }

      return podcast;
    })
  );

  // Get author name
  const podcastsWithAuthors = await Promise.all(
    podcasts.map(async (podcast) => {
      const authorDoc = await getDoc(
        doc(db, COLLECTIONS.USERS, podcast.authorId)
      );

      const author = { id: authorDoc.id, ...authorDoc.data() } as User;

      return {
        ...podcast,
        author: author.name,
      };
    })
  );

  return {
    podcasters,
    podcasts: podcastsWithAuthors,
  };
};
