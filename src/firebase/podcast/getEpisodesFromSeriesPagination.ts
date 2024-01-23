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

import { Collections } from "@/common/enums";

import { db } from "../init";

import type { Podcast } from "@/common/interfaces";

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
    collection(db, Collections.PODCASTS),
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

    return data as Podcast;
  });
};
