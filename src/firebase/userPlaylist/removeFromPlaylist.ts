/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { EpisodeReference, Playlist } from "@/common/interfaces";

import { db } from "../init";

export const removeFromPlaylist = async ({
  episode,
  playlistId,
}: EpisodeReference) => {
  const playlistRef = doc(db, COLLECTIONS.PLAYLISTS, playlistId);

  await updateDoc(playlistRef, { episodes: arrayRemove(episode) });

  return { episode, playlistId };

  // const playlistSnapshot = await getDoc(playlistRef);

  // const data = playlistSnapshot.data() as Playlist | undefined;

  // if (!data) {
  //   return;
  // }

  // const episodes = data.episodes.filter(
  //   (episode) => episode.episodeId !== episodeId
  // );

  // const playlistEmpty = episodes.length === 0;

  // if (playlistEmpty) {
  //   await deleteDoc(playlistRef);
  // } else {
  //   await updateDoc(playlistRef, { episodes });
  // }

  // return {
  //   episodeId,
  //   playlistId,
  //   playlistRemoved: playlistEmpty,
  // };
};
