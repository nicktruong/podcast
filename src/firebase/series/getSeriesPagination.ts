import {
  doc,
  limit,
  query,
  where,
  getDocs,
  orderBy,
  collection,
  documentId,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";
import { downloadPhotoFromStorage } from "../storage/downloadPhotoFromStorage";

import type { User, PodcastSeries } from "@/common/interfaces";

export const getSeriesPagination = async ({
  pageSize = 14,
  categories = [],
  sortBy = "createdAt",
}: {
  sortBy?: string;
  pageSize?: number;
  categories?: string[];
}) => {
  const queryConditions: any[] = [orderBy(sortBy, "desc"), limit(pageSize)];

  if (categories.length) {
    queryConditions.push(where("category", "in", categories));
  }

  const qSeries = query(
    collection(db, Collections.PODCAST_SERIES),
    ...queryConditions
  );

  const querySnapshot = await getDocs(qSeries);

  const podcastSeries = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    data.createdAt = data.createdAt.toDate().toISOString();
    data.updatedAt = data.updatedAt.toDate().toISOString();

    return { ...data, id: doc.id } as PodcastSeries;
  });

  const seriesIds = podcastSeries.map(({ id }) =>
    doc(db, Collections.PODCAST_SERIES, id)
  );

  if (!seriesIds.length) {
    return [];
  }

  const qCreatorsSeries = query(
    collection(db, Collections.CREATORS_PODCAST_SERIES),
    where("seriesId", "in", seriesIds)
  );

  const creatorsSeriesSnapshot = await getDocs(qCreatorsSeries);

  const creatorsSeries = creatorsSeriesSnapshot.docs.map((doc) => {
    const data = doc.data();

    return { creatorId: data.creatorId, seriesId: data.seriesId };
  });

  const qCreators = query(
    collection(db, Collections.USERS),
    where(
      documentId(),
      "in",
      creatorsSeries.map((ele) => ele.creatorId)
    )
  );

  const creatorsSnapshot = await getDocs(qCreators);

  const creators = creatorsSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        dob: doc.data().dob.toDate().toISOString(),
        id: doc.id,
      }) as User
  );

  const images = await Promise.all(
    podcastSeries.map(async (series) => {
      if (!series.coverUrl.startsWith("https")) {
        const url = await downloadPhotoFromStorage(series.coverUrl);

        return url;
      }

      return series.coverUrl;
    })
  );

  podcastSeries.forEach((series, index) => {
    series.coverUrl = images[index];
  });

  return podcastSeries.map((series) => ({
    ...series,
    author: creators.find((creator) => {
      const creatorSeries = creatorsSeries.find((creatorSeries) => {
        return (
          creatorSeries.seriesId.path ===
          doc(db, Collections.PODCAST_SERIES, series.id).path
        );
      });

      return (
        creatorSeries?.creatorId.path ===
        doc(db, Collections.USERS, creator.id).path
      );
    }),
  }));
};
