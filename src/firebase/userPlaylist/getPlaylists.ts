import { collection, getDocs, query, where } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Playlist } from "@/common/interfaces";

import { db } from "../init";

export const getOwnedPlaylists = async ({
  userId,
}: {
  userId: string;
}): Promise<Playlist[]> => {
  const snapshot = await getDocs(
    query(collection(db, COLLECTIONS.PLAYLISTS), where("userId", "==", userId))
  );

  const playlists = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Playlist;
  });

  return playlists;
};
