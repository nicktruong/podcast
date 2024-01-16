import {
  doc,
  query,
  where,
  getDocs,
  collection,
  documentId,
} from "firebase/firestore";

import {
  USERS,
  PODCASTS,
  CREATORS_PODCASTS,
} from "@/common/constants/firestoreCollectionNames";
import { Pod } from "@/common/interfaces";

import { db } from "./init";

export const getAllCreatorPodcasts = async (userId: string) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, CREATORS_PODCASTS),
      where("creatorId", "==", doc(db, USERS, userId))
    )
  );

  const podcastIds = querySnapshot.docs.map((doc) => {
    return doc.data().podcastId;
  });

  if (podcastIds.length > 0) {
    const podcastsSnapshot = await getDocs(
      query(collection(db, PODCASTS), where(documentId(), "in", podcastIds))
    );

    return podcastsSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) as Pod[];
  }
};
