import { collection, getDocs, query, where } from "firebase/firestore";

import { Collections } from "@/common/enums";
import { Playlist } from "@/common/interfaces";

import { db } from "../init";
import { getSeriesById } from "../series";
import { getEpisodeDetailById } from "../getEpisodeDetailById";
import { downloadPhotoFromStorage } from "../downloadPhotoFromStorage";

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

      const podcastsAndSeries = await Promise.all(
        data.podcasts.map(
          async ({
            seriesId,
            podcastId,
          }: {
            seriesId: string;
            podcastId: string;
          }) => {
            const series = await getSeriesById({ seriesId });
            const episodeDetail = await getEpisodeDetailById({ podcastId });

            return {
              series,
              episodeDetail,
            };
          }
        )
      );

      return {
        id: doc.id,
        coverUrl,
        ...doc.data(),
        podcasts: podcastsAndSeries.map(({ episodeDetail, series }) => ({
          ...episodeDetail,
          series,
        })),
        // series: podcastsAndSeries.map(({ series }) => series),
      } as Playlist;
    })
  );

  return playlists;
};
