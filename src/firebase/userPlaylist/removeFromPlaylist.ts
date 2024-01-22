import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

export const removeFromPlaylist = async ({
  podcastId,
  playlistId,
}: {
  podcastId: string;
  playlistId: string;
}) => {
  const ref = doc(db, Collections.PLAYLISTS, playlistId);
  const snapshot = await getDoc(ref);

  const data = snapshot.data();

  if (!data) {
    return;
  }

  const podcasts = data.podcasts.filter(
    (podcast: { podcastId: string }) => podcast.podcastId !== podcastId
  );

  if (podcasts.length === 0) {
    await deleteDoc(ref);
  } else {
    await updateDoc(ref, podcasts);
  }

  return {
    playlistRemoved: podcasts.length === 0,
    playlistId,
  };
};
