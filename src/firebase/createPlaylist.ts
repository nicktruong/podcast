import { addDoc, collection } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";

export const createOwnedPlaylist = async ({
  title,
  userId,
  coverUrl,
  podcastId,
}: {
  title: string;
  userId: string;
  coverUrl: string;
  podcastId: string;
}) => {
  const docRef = await addDoc(collection(db, Collections.PLAYLISTS), {
    title,
    userId,
    coverUrl,
    podcasts: [podcastId],
  });

  return docRef.id;
};
