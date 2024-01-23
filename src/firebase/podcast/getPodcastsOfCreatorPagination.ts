import { doc, getDoc } from "firebase/firestore";

import { db } from "../init";

import { getCreatorsPodcastsPagination } from "./getCreatorsPodcastsPagination";

import type { Podcast } from "@/common/interfaces";

export const getPodcastsOfCreatorPagination = async ({
  offset,
  pageSize,
  creatorId,
}: {
  offset?: Date;
  pageSize?: number;
  creatorId: string;
}) => {
  const creatorsPods = await getCreatorsPodcastsPagination({
    offset,
    pageSize,
    creatorId,
  });

  const podcastRefs = creatorsPods.map((creatorPod) =>
    doc(db, creatorPod.podcastId)
  );

  const snapshotArray = await Promise.all(
    podcastRefs.map((ref) =>
      getDoc(ref).then((doc) => {
        const data = doc.data();

        return {
          ...data,
          createdAt:
            data?.createdAt.toDate().toISOString() ?? new Date().toISOString(),
          updatedAt:
            data?.createdAt.toDate().toISOString() ?? new Date().toISOString(),
          publishedDate:
            data?.publishedDate.toDate().toISOString() ??
            new Date().toISOString(),
          id: ref.id,
        } as Podcast;
      })
    )
  );

  return snapshotArray;
};
