import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

import type { CreatorsPodcastSeries, PodcastSeries } from "@/common/interfaces";

export const getCreatorPodcastSeries = async (creatorId: string) => {
  const creatorsPodcastSeriesSnapshot = await getDocs(
    query(
      collection(db, Collections.CREATORS_PODCAST_SERIES),
      where("creatorId", "==", doc(db, "users", creatorId))
    )
  );

  const creatorsPodcastSeriesData = creatorsPodcastSeriesSnapshot.docs.map(
    (doc) => {
      const data = doc.data();
      data.seriesId = data.seriesId.path;
      data.creatorId = data.creatorId.path;
      data.createdAt = data.createdAt.toDate().toISOSTring();
      data.updatedAt = data.updatedAt.toDate().toISOSTring();

      return data as CreatorsPodcastSeries;
    }
  );

  const podcastSeriesSnapshots = await Promise.all(
    creatorsPodcastSeriesData.map((data) => {
      return getDoc(doc(db, Collections.PODCAST_SERIES, data.seriesId));
    })
  );

  const podcastSeries = podcastSeriesSnapshots.map((snapshot) => {
    return { ...snapshot.data(), id: snapshot.id } as PodcastSeries;
  });

  return podcastSeries[0];
};
