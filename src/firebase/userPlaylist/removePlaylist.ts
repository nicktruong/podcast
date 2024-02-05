import { deleteDoc, doc } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

export const removePlaylist = async (playlistId: string) => {
  await deleteDoc(doc(db, Collections.PLAYLISTS, playlistId));

  return playlistId;
};
