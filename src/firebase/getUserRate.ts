import { doc, getDoc } from "firebase/firestore";

import { RATING } from "@/common/constants/firestoreCollectionNames";
import { Rating } from "@/common/interfaces/Rating";

import { db } from "./init";

export const getUserRate = async ({
  userId,
  podcastOrSeriesId,
}: {
  userId: string;
  podcastOrSeriesId: string;
}) => {
  const snapshot = await getDoc(
    doc(db, RATING, `${userId}-rates-${podcastOrSeriesId}`)
  );
  const rating = snapshot.data() as Rating;

  return rating;
};
