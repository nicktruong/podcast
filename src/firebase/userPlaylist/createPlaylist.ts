import { addDoc, collection } from "firebase/firestore";

import { Collections } from "@/common/enums";
import { PlaylistCreationData } from "@/common/interfaces";

import { db } from "../init";

export const createOwnedPlaylist = async ({
  title,
  userId,
  coverUrl,
  seriesId,
  podcastId,
}: PlaylistCreationData) => {
  const docRef = await addDoc(collection(db, Collections.PLAYLISTS), {
    title,
    userId,
    coverUrl,
    podcasts: [{ podcastId, seriesId }],
  });

  return docRef.id;
};
