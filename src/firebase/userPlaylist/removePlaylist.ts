import { deleteDoc, doc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

export const removePlaylist = async (playlistId: string) => {
  await deleteDoc(doc(db, COLLECTIONS.PLAYLISTS, playlistId));

  return playlistId;
};
