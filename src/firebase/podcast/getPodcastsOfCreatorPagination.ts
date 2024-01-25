import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { EPISODE_FIELDS } from "@/common/enums/EpisodeFields";
import { Episode } from "@/common/interfaces";

import { db } from "../init";

export const fetchEpisodesPagedFromCreatorId = async ({
  creatorId,
  pageSize = 5,
  offset = new Date(),
}: {
  creatorId: string;
  offset?: Date;
  pageSize?: number;
}) => {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.EPISODES),
      where("authorId", "==", creatorId),
      orderBy(EPISODE_FIELDS.CREATED_AT, "desc"),
      startAfter(offset.toISOString()),
      limit(pageSize)
    )
  );

  const episodes = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Episode
  );

  return episodes;
};
