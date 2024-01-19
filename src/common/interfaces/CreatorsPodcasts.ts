import { DocumentReference, Timestamp } from "firebase/firestore";

export interface CreatorsPodcasts {
  creatorId: string; // path to ref
  podcastId: string; // path to ref
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
}

export interface FirestoreCreatorsPodcasts {
  creatorId: DocumentReference;
  podcastId: DocumentReference; // path to ref
  createdAt: Timestamp; // ISO format
  updatedAt: Timestamp; // ISO format
}
