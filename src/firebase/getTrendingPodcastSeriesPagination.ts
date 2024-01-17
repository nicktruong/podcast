import {
  Timestamp,
  collection,
  doc,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";

import { PodcastSeries } from "@/common/interfaces/PodcastSeries";
import {
  CREATORS_PODCAST_SERIES,
  PODCAST_SERIES,
  USERS,
} from "@/common/constants/firestoreCollectionNames";
import { User } from "@/common/interfaces";

import { db } from "./init";
import { downloadPhoto } from "./downloadPhoto";

export const getTrendingPodcastSeriesPagination = async ({
  period = 7,
  pageSize = 5,
}: {
  period?: number;
  pageSize?: number;
}) => {
  const trendingPeriod = new Date();
  trendingPeriod.setDate(trendingPeriod.getDate() - period);

  const qSeries = query(
    collection(db, PODCAST_SERIES),
    orderBy("playCount", "desc"),
    startAt(Timestamp.fromDate(trendingPeriod)),
    limit(pageSize)
  );

  const querySnapshot = await getDocs(qSeries);

  const trendingPodcastSeries = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    data.createdAt = data.createdAt.toDate().toISOString();
    data.updatedAt = data.updatedAt.toDate().toISOString();

    return { ...data, id: doc.id } as PodcastSeries;
  });

  const seriesIds = querySnapshot.docs.map(({ id }) =>
    doc(db, PODCAST_SERIES, id)
  );

  const qCreatorsSeries = query(
    collection(db, CREATORS_PODCAST_SERIES),
    where("seriesId", "in", seriesIds)
  );

  const creatorsSeriesSnapshot = await getDocs(qCreatorsSeries);

  const creatorsSeries = creatorsSeriesSnapshot.docs.map((doc) => {
    const data = doc.data();

    return { creatorId: data.creatorId, seriesId: data.seriesId };
  });

  const qCreators = query(
    collection(db, USERS),
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
        const blob = await downloadPhoto(series.coverUrl);

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
          doc(db, PODCAST_SERIES, series.id).path
        );
      });

      return creatorSeries?.creatorId.path === doc(db, USERS, creator.id).path;
    }),
  }));
};
