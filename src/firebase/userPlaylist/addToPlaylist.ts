import { doc, getDoc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type {
  Playlist,
  PlaylistEpisode,
  AddToPlaylistData,
} from "@/common/interfaces";

export const addToPlaylist = async ({
  episodeId,
  podcastId,
  playlistId,
}: AddToPlaylistData): Promise<PlaylistEpisode> => {
  const playlistRef = doc(db, COLLECTIONS.PLAYLISTS, playlistId);

  const playlistSnapshot = await getDoc(playlistRef);

  const data = playlistSnapshot.data() as Playlist;

  const episode: PlaylistEpisode = {
    podcastId,
    episodeId,
    addedDate: new Date().toISOString(),
  };

  data.episodes.push(episode);

  await updateDoc(playlistRef, {
    episodes: data.episodes,
  });

  return episode;
};
