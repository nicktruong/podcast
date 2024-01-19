import { doc, getDoc } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";
import { downloadPhotoFromStorage } from "./downloadPhotoFromStorage";

import type { PodcastSeries } from "@/common/interfaces";

export const getSeriesDetail = async ({ seriesId }: { seriesId: string }) => {
  const docRef = doc(db, Collections.PODCAST_SERIES, seriesId);
  const docSnapshot = await getDoc(docRef);
  const data = docSnapshot.data();

  if (!data) {
    // TODO: handle error
    console.log("Please handle error");
    throw new Error("Not found");
  }

  data.id = docSnapshot.id;
  data.createdAt = data.createdAt?.toDate().toISOString();
  data.updatedAt = data.updated?.toDate().toISOString();

  const series = data as PodcastSeries;

  if (!series.coverUrl.startsWith("https")) {
    const blob = await downloadPhotoFromStorage(series.coverUrl);

    series.coverUrl = URL.createObjectURL(blob);
  }

  return series;
};
