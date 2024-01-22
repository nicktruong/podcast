import { collection, getDocs, query, where } from "firebase/firestore";

import { Collections } from "@/common/enums";
import { Playlist } from "@/common/interfaces/Playlist";

import { db } from "./init";
import { getEpisodeDetailById } from "./getEpisodeDetailById";
import { downloadPhotoFromStorage } from "./downloadPhotoFromStorage";

export const getOwnedPlaylists = async ({ userId }: { userId: string }) => {
  const snapshot = await getDocs(
    query(collection(db, Collections.PLAYLISTS), where("userId", "==", userId))
  );

  const playlists = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      let coverUrl: string = data.coverUrl;

      if (!data.coverUrl.startsWith("https")) {
        coverUrl = await downloadPhotoFromStorage(data.coverUrl);
      }

      const podcasts = await Promise.all(
        data.podcasts.map((podcastId: string) =>
          getEpisodeDetailById({ podcastId })
        )
      );

      return { id: doc.id, coverUrl, ...doc.data(), podcasts } as Playlist;
    })
  );

  return playlists;
};
