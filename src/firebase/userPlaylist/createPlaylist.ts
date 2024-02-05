import { addDoc, collection } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

import type { Playlist, PlaylistCreationData } from "@/common/interfaces";

export const createOwnedPlaylist = async ({
  title,
  userId,
  coverUrl,
  episodeId,
  podcastId,
}: PlaylistCreationData) => {
  const currentDate = new Date().toISOString();

  const playlist: Omit<Playlist, "id"> = {
    title,
    userId,
    coverUrl,
    createdAt: currentDate,
    updatedAt: currentDate,
    episodes: [
      {
        episodeId,
        podcastId,
        addedDate: currentDate,
      },
    ],
  };

  const docRef = await addDoc(collection(db, Collections.PLAYLISTS), playlist);

  return { id: docRef.id, currentDate };
};
