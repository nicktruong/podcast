import {
  Timestamp,
  collection,
  doc,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";
import { downloadPhotoFromStorage } from "./downloadPhotoFromStorage";

import type { User, PodcastSeries } from "@/common/interfaces";

export const getTrendingPodcastSeriesPagination = async ({
  period = 7,
  pageSize = 5,
  categories = [],
  notInIds = [],
}: {
  period?: number;
  pageSize?: number;
  categories?: string[];
  notInIds?: string[];
}) => {
  const trendingPeriod = new Date();
  trendingPeriod.setDate(trendingPeriod.getDate() - period);

  const queryConditions: any[] = [
    orderBy("playCount", "desc"),
    startAt(Timestamp.fromDate(trendingPeriod)),
    limit(pageSize),
  ];

  if (categories.length) {
    queryConditions.push(where("category", "in", categories));
  }

  const qSeries = query(
    collection(db, Collections.PODCAST_SERIES),
    ...queryConditions
  );

  const querySnapshot = await getDocs(qSeries);

  const trendingPodcastSeries = querySnapshot.docs
    .map((doc) => {
      const data = doc.data();
      data.createdAt = data.createdAt.toDate().toISOString();
      data.updatedAt = data.updatedAt.toDate().toISOString();

      return { ...data, id: doc.id } as PodcastSeries;
    })
    .filter((data) => !notInIds.includes(data.id));

  if (trendingPodcastSeries.length < pageSize) {
    queryConditions[1] = startAfter(
      trendingPodcastSeries.at(-1)?.playCount ?? 0
    );
    queryConditions.push(limit(pageSize - trendingPodcastSeries.length));
    const fillingSnapshot = await getDocs(
      query(collection(db, Collections.PODCAST_SERIES), ...queryConditions)
    );

    trendingPodcastSeries.concat(
      fillingSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          data.createdAt = data.createdAt.toDate().toISOString();
          data.updatedAt = data.updatedAt.toDate().toISOString();

          return { ...data, id: doc.id } as PodcastSeries;
        })
        .filter((data) => !notInIds.includes(data.id))
    );
  }

  const seriesIds = trendingPodcastSeries
    .filter(({ id }) => !notInIds.includes(id))
    .map(({ id }) => doc(db, Collections.PODCAST_SERIES, id));

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
    trendingPodcastSeries.map(async (series) => {
      if (!series.coverUrl.startsWith("https")) {
        const blob = await downloadPhotoFromStorage(series.coverUrl);

        return URL.createObjectURL(blob);
      }

      return series.coverUrl;
    })
  );

  trendingPodcastSeries.forEach((series, index) => {
    series.coverUrl = images[index];
  });

  return trendingPodcastSeries.map((series) => ({
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
