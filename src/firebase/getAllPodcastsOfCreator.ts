import {
  doc,
  query,
  where,
  getDocs,
  collection,
  documentId,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";

import type { Podcast } from "@/common/interfaces";

export const getAllPodcastsOfCreator = async (creatorId: string) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, Collections.CREATORS_PODCASTS),
      where("creatorId", "==", doc(db, Collections.USERS, creatorId))
    )
  );

  const podcastIds = querySnapshot.docs.map((doc) => {
    return doc.data().podcastId;
  });

  if (podcastIds.length > 0) {
    const podcastsSnapshot = await getDocs(
      query(
        collection(db, Collections.PODCASTS),
        where(documentId(), "in", podcastIds)
      )
    );

    return podcastsSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) as Podcast[];
  }
};
