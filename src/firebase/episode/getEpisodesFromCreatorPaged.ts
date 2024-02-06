import {
  limit,
  query,
  where,
  orderBy,
  getDocs,
  collection,
  startAfter,
} from "firebase/firestore";

import { Collections } from "@/enums";
import { EpisodeFields } from "@/firebase/fields";

import { db } from "../init";
import { downloadFile } from "../storage";

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
      collection(db, Collections.EPISODES),
      where("authorId", "==", creatorId),
      orderBy(EpisodeFields.CREATED_AT, "desc"),
      startAfter(offset.toISOString()),
      limit(pageSize)
    )
  );

  const episodes = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const episode = { id: doc.id, ...doc.data() } as Episode;

      const populatedEpisode = await populateEpisode(episode);

      if (
        populatedEpisode.pathToImgFile &&
        !populatedEpisode.pathToImgFile.startsWith("https")
      ) {
        populatedEpisode.pathToImgFile = await downloadFile(
          populatedEpisode.pathToImgFile
        );
      }

      return populatedEpisode;
    })
  );

  return episodes;
};
