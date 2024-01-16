import { doc, getDoc } from "firebase/firestore";

import { Pod } from "@/common/interfaces";

import { db } from "./init";
import { getCreatorsPodsPagination } from "./getCreatorsPodsPagination";

export const getCurrentCreatorPodcastsPagination = async ({
  creatorId,
  offset,
  pageSize,
}: {
  creatorId: string;
  offset?: Date;
  pageSize?: number;
}) => {
  const creatorsPods = await getCreatorsPodsPagination({
    creatorId,
    offset,
    pageSize,
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
        } as Pod;
      })
    )
  );

  return snapshotArray;
};
