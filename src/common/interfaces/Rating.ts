import { FieldValue } from "firebase/firestore";

export interface Rating {
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  podcastOrSeriesId: string;
}

export type RatingFirestore = Omit<Rating, "createdAt" | "updatedAt"> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};
