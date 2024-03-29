import { doc, getDoc, updateDoc } from "firebase/firestore";

import { Collections } from "@/enums";

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
  const playlistRef = doc(db, Collections.PLAYLISTS, playlistId);

  const playlistSnapshot = await getDoc(playlistRef);

  const data = {
    id: playlistSnapshot.id,
    ...playlistSnapshot.data(),
  } as Playlist;

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
