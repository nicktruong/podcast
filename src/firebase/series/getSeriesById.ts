import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
  documentId,
} from "firebase/firestore";

import { Collections } from "@/common/enums";
import { PodcastSeries, User } from "@/common/interfaces";

import { db } from "../init";

export const getSeriesById = async ({ seriesId }: { seriesId: string }) => {
  const snapshot = await getDoc(doc(db, Collections.PODCAST_SERIES, seriesId));
  const data = snapshot.data();

  if (!data) {
    return;
  }

  const createdAt: string = data.createdAt.toDate().toISOString();
  const updatedAt: string = data.updatedAt.toDate().toISOString();

  const result = { ...data, id: snapshot.id } as PodcastSeries;

  const qCreatorsSeries = query(
    collection(db, Collections.CREATORS_PODCAST_SERIES),
    where("seriesId", "==", doc(db, Collections.PODCAST_SERIES, seriesId))
  );

  const creatorsSeriesSnapshot = await getDocs(qCreatorsSeries);

  const creatorIds = creatorsSeriesSnapshot.docs.map((doc) => {
    const data = doc.data();

    return data.creatorId;
  });

  const qCreators = query(
    collection(db, Collections.USERS),
    where(documentId(), "==", creatorIds[0])
  );

  const creatorsSnapshot = await getDocs(qCreators);

  const creator = creatorsSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        dob: doc.data().dob.toDate().toISOString(),
        id: doc.id,
      }) as User
  )[0];

  return { ...result, createdAt, updatedAt, author: creator };
};
