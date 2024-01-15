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

import {
  USERS,
  CREATORS_PODCASTS,
} from "@/common/constants/firestoreCollectionNames";
import { CreatorsPodcasts } from "@/common/interfaces/ICreatorsPodcasts";

import { db } from "./init";

export const getCreatorsPodsPagination = async ({
  creatorId,
  offset = new Date(2024, 0, 1),
  pageSize = 5,
}: {
  page?: number;
  offset?: Date;
  creatorId: string;
  pageSize?: number;
}) => {
  const q = query(
    collection(db, CREATORS_PODCASTS),
    where("creatorId", "==", doc(db, USERS, creatorId)),
    orderBy("createdAt"),
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
