import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { Episode } from "@/common/interfaces";

export const getEpisodeDetailById = async ({
  podcastId,
}: {
  podcastId: string;
}) => {
  const snapshot = await getDoc(doc(db, COLLECTIONS.PODCASTS, podcastId));
  const data = snapshot.data();

  if (!data) {
    return;
  }

  const createdAt: string = data.createdAt.toDate().toISOString();
  const updatedAt: string = data.updatedAt.toDate().toISOString();
  const publishedDate: string = data.publishedDate.toDate().toISOString();

  const result = data as Episode;

  return { ...result, id: snapshot.id, createdAt, updatedAt, publishedDate };
};
