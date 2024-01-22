import { doc, getDoc, updateDoc } from "firebase/firestore";

import { Collections } from "@/common/enums";
import { PlaylistRaw } from "@/common/interfaces/Playlist";

import { db } from "./init";

export const addToPlaylist = async ({
  podcastId,
  playlistId,
}: {
  podcastId: string;
  playlistId: string;
}) => {
  const snapshot = await getDoc(doc(db, Collections.PLAYLISTS, playlistId));
  const data = snapshot.data() as PlaylistRaw;
  data.podcasts.push(podcastId);
  await updateDoc(doc(db, Collections.PLAYLISTS, playlistId), {
    podcasts: data.podcasts,
  });
};
