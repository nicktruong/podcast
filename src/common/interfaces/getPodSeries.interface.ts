import { DocumentReference, Timestamp } from "@firebase/firestore";

export interface IGetPodSeries {
  title: string;
  rating?: number;
  coverUrl: string;
  playCount: number;
  description: string;
  audienceSize: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  categoryId: DocumentReference;
}
