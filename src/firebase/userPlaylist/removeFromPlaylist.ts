import { doc, updateDoc, arrayRemove } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { EpisodeReference } from "@/common/interfaces";

export const removeFromPlaylist = async ({
  episode,
  playlistId,
}: EpisodeReference) => {
  const playlistRef = doc(db, COLLECTIONS.PLAYLISTS, playlistId);

  await updateDoc(playlistRef, { episodes: arrayRemove(episode) });

  return { episode, playlistId };
};
