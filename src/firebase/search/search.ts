import {
  doc,
  query,
  where,
  getDocs,
  collection,
  documentId,
} from "firebase/firestore";

import { User } from "@/common/interfaces";
import { Collections } from "@/common/enums";

import { db } from "../init";
import { downloadPhotoFromStorage } from "../downloadPhotoFromStorage";

export const search = async (searchText: string) => {
  if (!searchText) {
    return { podcasters: [], series: [] };
  }

  const podcastersRef = collection(db, Collections.USERS);
  const podcastersSnapshot = await getDocs(
    query(
      podcastersRef,
      where("name", ">=", searchText),
      where("name", "<=", searchText + "\uf8ff")
    )
  );

  const podcasters = podcastersSnapshot.docs.map((doc) => {
    const data = doc.data();
    const dob = data.dob?.toDate().toISOString();

    return { ...data, id: doc.id, dob } as {
      id: string;
      dob: string;
      name: string;
      photoURL: string;
    };
  });

  const seriesRef = collection(db, Collections.PODCAST_SERIES);
  const seriesSnapshot = await getDocs(
    query(
      seriesRef,
      where("title", ">=", searchText),
      where("title", "<=", searchText + "\uf8ff")
    )
  );
  const series = seriesSnapshot.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt.toDate().toISOString();
    const updatedAt = data.updatedAt.toDate().toISOString();

    return { ...data, id: doc.id, createdAt, updatedAt } as {
      id: string;
      title: string;
      author: string;
      coverUrl: string;
      createdAt: string;
      updatedAt: string;
    };
  });

  let returnSeries: {
    author: string;
    id: string;
    title: string;
    coverUrl: string;
    createdAt: string;
    updatedAt: string;
  }[] = [];

  if (series.length) {
    const qCreatorsSeries = query(
      collection(db, Collections.CREATORS_PODCAST_SERIES),
      where(
        "seriesId",
        "in",
        series.map(({ id }) => doc(db, Collections.PODCAST_SERIES, id))
      )
    );

    const creatorsSeriesSnapshot = await getDocs(qCreatorsSeries);

    const creatorsSeries = creatorsSeriesSnapshot.docs.map((doc) => {
      const data = doc.data();

      return { creatorId: data.creatorId, seriesId: data.seriesId };
    });

    if (creatorsSeries.length) {
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
            id: doc.id,
            dob: doc.data().dob.toDate().toISOString(),
          }) as User
      );

      const images = await Promise.all(
        series.map(async (series) => {
          if (!series.coverUrl.startsWith("https")) {
            const url = await downloadPhotoFromStorage(series.coverUrl);

            return url;
          }

          return series.coverUrl;
        })
      );

      series.forEach((series, index) => {
        series.coverUrl = images[index];
      });

      returnSeries = series.map((series) => ({
        ...series,
        author:
          creators.find((creator) => {
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
          })?.name ?? "",
      }));
    }
  }

  return {
    podcasters,
    series: returnSeries,
  };
};
