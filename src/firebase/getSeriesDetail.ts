import { doc, getDoc } from "firebase/firestore";

import { PODCAST_SERIES } from "@/common/constants/firestoreCollectionNames";
import { PodcastSeries } from "@/common/interfaces/PodcastSeries";

import { db } from "./init";
import { downloadPhoto } from "./downloadPhoto";

export const getSeriesDetail = async ({ seriesId }: { seriesId: string }) => {
  const docRef = doc(db, PODCAST_SERIES, seriesId);
  const docSnapshot = await getDoc(docRef);
  const data = docSnapshot.data();

  if (!data) {
    // TODO: handle error
    console.log("Please handle error");
    throw new Error("Not found");
  }

  data.createdAt = data.createdAt?.toDate().toISOString();
  data.updatedAt = data.updated?.toDate().toISOString();

  const series = data as PodcastSeries;

  if (!series.coverUrl.startsWith("https")) {
    const blob = await downloadPhoto(series.coverUrl);

    series.coverUrl = URL.createObjectURL(blob);
  }

  return series;
};
