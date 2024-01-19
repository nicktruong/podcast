import {
  Timestamp,
  collection,
  doc,
  documentId,
  endAt,
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

export const getRandomPodcastSeriesPagination = async ({
  period = 30,
  pageSize = 5,
  categories = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  notInIds = [],
}: {
  period?: number;
  pageSize?: number;
  categories?: string[];
  notInIds?: string[];
}) => {
  const randomPeriod = new Date();
  randomPeriod.setDate(
    randomPeriod.getDate() - Math.floor(Math.random() * period)
  );

  const queryConditions: any[] = [
    orderBy("playCount", "asc"),
    startAt(Timestamp.fromDate(randomPeriod)),
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

  const randomPodcastSeries = querySnapshot.docs
    .map((doc) => {
      const data = doc.data();
      data.createdAt = data.createdAt.toDate().toISOString();
      data.updatedAt = data.updatedAt.toDate().toISOString();

      return { ...data, id: doc.id } as PodcastSeries;
    })
    .filter((data) => !notInIds.includes(data.id));

  if (querySnapshot.docs.length < pageSize) {
    queryConditions[1] = endAt(Timestamp.fromDate(randomPeriod));
  }

  const reverseQuerySnapShot = await getDocs(
    query(collection(db, Collections.PODCAST_SERIES), ...queryConditions)
  );

  const reverseRandomPodcastSeries = reverseQuerySnapShot.docs
    .map((doc) => {
      const data = doc.data();
      data.createdAt = data.createdAt.toDate().toISOString();
      data.updatedAt = data.updatedAt.toDate().toISOString();

      return { ...data, id: doc.id } as PodcastSeries;
    })
    .filter((data) => !notInIds.includes(data.id));

  randomPodcastSeries.splice(
    -1,
    0,
    ...reverseRandomPodcastSeries.slice(
      0,
      pageSize - querySnapshot.docs.length - 1
    )
  );

  if (randomPodcastSeries.length < pageSize) {
    queryConditions[1] = startAfter(randomPodcastSeries.at(-1)?.createdAt ?? 0);
    queryConditions.push(limit(pageSize - randomPodcastSeries.length));
    const fillingSnapshot = await getDocs(
      query(collection(db, Collections.PODCAST_SERIES), ...queryConditions)
    );

    randomPodcastSeries.concat(
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

  const seriesIds = randomPodcastSeries.map(({ id }) =>
    doc(db, Collections.PODCAST_SERIES, id)
  );

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
    randomPodcastSeries.map(async (series) => {
      if (!series.coverUrl.startsWith("https")) {
        const blob = await downloadPhotoFromStorage(series.coverUrl);

        return URL.createObjectURL(blob);
      }

      return series.coverUrl;
    })
  );

  randomPodcastSeries.forEach((series, index) => {
    series.coverUrl = images[index];
  });

  return randomPodcastSeries.map((series) => ({
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
