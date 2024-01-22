import { doc, getDoc } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";

import type { Podcast } from "@/common/interfaces";

export const getEpisodeDetailById = async ({
  podcastId,
}: {
  podcastId: string;
}) => {
  const snapshot = await getDoc(doc(db, Collections.PODCASTS, podcastId));
  const data = snapshot.data();

  if (!data) {
    return;
  }

  const createdAt: string = data.createdAt.toDate().toISOString();
  const updatedAt: string = data.updatedAt.toDate().toISOString();
  const publishedDate: string = data.publishedDate.toDate().toISOString();

  const result = data as Podcast;

  return { ...result, createdAt, updatedAt, publishedDate };
};
