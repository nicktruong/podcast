import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { Collections } from "@/enums";

import { db } from "../init";

import type { Playlist } from "@/common/interfaces";

export const getOwnedPlaylists = async ({
  userId,
}: {
  userId: string;
}): Promise<Playlist[]> => {
  const snapshot = await getDocs(
    query(
      collection(db, Collections.PLAYLISTS),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    )
  );

  const playlists = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Playlist;
  });

  return playlists;
};
