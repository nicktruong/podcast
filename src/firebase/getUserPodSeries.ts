import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
  DocumentData,
} from "firebase/firestore";

import { IGetPodSeries } from "@/common/interfaces/getPodSeries.interface";

import { db } from "./init";

export const getUserPodSeries = async (creatorId: string) => {
  const q = query(
    collection(db, "creatorsPodcastSeries"),
    where("creatorId", "==", doc(db, "users", creatorId))
  );

  const querySnapshot = await getDocs(q);

  const podSeriesSnapshots = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const seriesRef = doc.data().seriesId;

      return getDoc<IGetPodSeries, DocumentData>(seriesRef).then(
        (snapshot) => ({ id: seriesRef.id as string, snapshot })
      );
    })
  );

  const podSeries = podSeriesSnapshots.map(({ id, snapshot }) => ({
    id,
    ...snapshot.data(),
  }))[0]; // Initially, we just handle 1 podcast series

  return podSeries ?? {};
};
