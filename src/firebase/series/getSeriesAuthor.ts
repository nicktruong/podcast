import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

import type { FirestoreCreatorsPodcasts, User } from "@/common/interfaces";

export const getSeriesAuthor = async ({ seriesId }: { seriesId: string }) => {
  const q = query(
    collection(db, Collections.CREATORS_PODCAST_SERIES),
    where("seriesId", "==", doc(db, Collections.PODCAST_SERIES, seriesId))
  );
  const docSnapshot = await getDocs(q);
  const creatorPodcast = docSnapshot.docs.map(
    (doc) => doc.data() as FirestoreCreatorsPodcasts
  )[0];

  const creatorSnapshot = await getDoc(creatorPodcast.creatorId);

  const data = creatorSnapshot.data();

  if (!data) {
    // TODO: Handle error
    console.log("Please handle the error");
    throw new Error("Not found");
  }

  data.dob = data.dob?.toDate().toISOString();

  return data as User;
};
