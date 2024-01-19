import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import {
  PODCAST_SERIES,
  CREATORS_PODCAST_SERIES,
} from "@/common/constants/firestoreCollectionNames";
import { CreatorsPodcastSeries } from "@/common/interfaces/CreatorsPodcastSeries";
import { PodcastSeries } from "@/common/interfaces/PodcastSeries";

import { db } from "./init";

export const getUserPodSeries = async (creatorId: string) => {
  const creatorsPodcastSeriesSnapshot = await getDocs(
    query(
      collection(db, CREATORS_PODCAST_SERIES),
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
      return getDoc(doc(db, PODCAST_SERIES, data.seriesId));
    })
  );

  const podcastSeries = podcastSeriesSnapshots.map((snapshot) => {
    return { ...snapshot.data(), id: snapshot.id } as PodcastSeries;
  });

  return podcastSeries[0];
};
