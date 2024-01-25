import { addDoc, collection } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Playlist, PlaylistCreationData } from "@/common/interfaces";

import { db } from "../init";

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

  const docRef = await addDoc(collection(db, COLLECTIONS.PLAYLISTS), playlist);

  return { id: docRef.id, currentDate };
};
