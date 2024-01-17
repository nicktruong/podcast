import {
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";

import { PODCASTS } from "@/common/constants/firestoreCollectionNames";
import { Pod } from "@/common/interfaces";

import { db } from "./init";

export const getEpisodesFromSeriesPagination = async ({
  seriesId,
  pageSize = 5,
  offset = new Date(),
}: {
  seriesId: string;
  pageSize?: number;
  offset?: Date;
}) => {
  const q = query(
    collection(db, PODCASTS),
    where("seriesId", "==", seriesId),
    orderBy("createdAt", "desc"),
    startAt(Timestamp.fromDate(offset)),
    limit(pageSize)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    data.createdAt = data.createdAt?.toDate().toISOString();
    data.updatedAt = data.updatedAt?.toDate().toISOString();
    data.publishedDate = data.publishedDate?.toDate().toISOString();
    data.id = doc.id;

    return data as Pod;
  });
};
