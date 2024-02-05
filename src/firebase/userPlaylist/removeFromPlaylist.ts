import { doc, updateDoc, arrayRemove } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

import type { EpisodeReference } from "@/common/interfaces";

export const removeFromPlaylist = async ({
  episode,
  playlistId,
}: EpisodeReference) => {
  const playlistRef = doc(db, Collections.PLAYLISTS, playlistId);

  await updateDoc(playlistRef, { episodes: arrayRemove(episode) });

  return { episode, playlistId };
};
