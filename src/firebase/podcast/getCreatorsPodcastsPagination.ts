import {
  doc,
  limit,
  query,
  where,
  getDocs,
  orderBy,
  startAt,
  Timestamp,
  collection,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

import type { CreatorsPodcasts } from "@/common/interfaces";

export const getCreatorsPodcastsPagination = async ({
  creatorId,
  pageSize = 5,
  offset = new Date(),
}: {
  page?: number;
  offset?: Date;
  creatorId: string;
  pageSize?: number;
}) => {
  const q = query(
    collection(db, Collections.CREATORS_PODCASTS),
    where("creatorId", "==", doc(db, Collections.USERS, creatorId)),
    orderBy("createdAt", "desc"),
    startAt(Timestamp.fromDate(offset)),
    limit(pageSize)
  );

  const querySnapshot = await getDocs(q);

  const podcasts = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    data.createdAt = data.createdAt.toDate().toISOString();
    data.updatedAt = data.updatedAt.toDate().toISOString();
    data.creatorId = data.creatorId.path;
    data.podcastId = data.podcastId.path;

    return data;
  }) as CreatorsPodcasts[];

  return podcasts;
};
