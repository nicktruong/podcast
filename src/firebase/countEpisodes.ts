import {
  collection,
  doc,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

import {
  CREATORS_PODCASTS,
  USERS,
} from "@/common/constants/firestoreCollectionNames";

import { db } from "./init";

export const countEpisodes = async (userId: string) => {
  // TODO: add field to creator document
  const snapshot = await getCountFromServer(
    query(
      collection(db, CREATORS_PODCASTS),
      where("creatorId", "==", doc(db, USERS, userId))
    )
  );

  return snapshot.data().count;
};
