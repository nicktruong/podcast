import {
  limit,
  query,
  where,
  orderBy,
  getDocs,
  collection,
  startAfter,
} from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { EPISODE_FIELDS } from "@/common/fields";

import { db } from "../init";

import { populateEpisode } from "./populateEpisode";

import type {
  Episode,
  GetEpisodesFromCreatorPagedOptions,
} from "@/common/interfaces";

export const getEpisodesFromCreatorPaged = async ({
  creatorId,
  pageSize = 5,
  offset = new Date(),
}: GetEpisodesFromCreatorPagedOptions) => {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.EPISODES),
      where("authorId", "==", creatorId),
      orderBy(EPISODE_FIELDS.CREATED_AT, "desc"),
      startAfter(offset.toISOString()),
      limit(pageSize)
    )
  );

  const episodes = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const episode = { id: doc.id, ...doc.data() } as Episode;

      const populatedEpisode = await populateEpisode(episode);

      return populatedEpisode;
    })
  );

  return episodes;
};
