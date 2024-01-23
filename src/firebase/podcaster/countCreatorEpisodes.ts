import {
  doc,
  query,
  where,
  collection,
  getCountFromServer,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

export const countCreatorEpisodes = async (userId: string) => {
  // TODO: add field to creator document to cache episodes created and remove this function
  const snapshot = await getCountFromServer(
    query(
      collection(db, Collections.CREATORS_PODCASTS),
      where("creatorId", "==", doc(db, Collections.USERS, userId))
    )
  );

  return snapshot.data().count;
};
