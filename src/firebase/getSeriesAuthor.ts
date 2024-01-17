import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  CREATORS_PODCAST_SERIES,
  PODCAST_SERIES,
} from "@/common/constants/firestoreCollectionNames";
import { FirestoreCreatorsPodcasts, User } from "@/common/interfaces";

import { db } from "./init";

export const getSeriesAuthor = async ({ seriesId }: { seriesId: string }) => {
  const q = query(
    collection(db, CREATORS_PODCAST_SERIES),
    where("seriesId", "==", doc(db, PODCAST_SERIES, seriesId))
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

  data.dob = data.dob.toDate().toISOString();

  return data as User;
};
