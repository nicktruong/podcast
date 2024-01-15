import {
  doc,
  addDoc,
  Timestamp,
  collection,
  serverTimestamp,
} from "@firebase/firestore";

import {
  PODCASTS,
  CREATORS_PODCASTS,
} from "@/common/constants/firestoreCollectionNames";
import { Pod } from "@/common/interfaces/pod.interface";
import { PodStatus } from "@/common/constants/pod-status";

import { db } from "./init";

export const publishPod = async (pod: Pod, userId: string) => {
  // create pod document
  // TODO: change podcasts to constants
  const docRef = await addDoc(collection(db, PODCASTS), {
    title: pod.title,
    rating: null, // change when podcast get first rating
    seriesId: null, // change when user first create series
    playCount: 0,
    status: PodStatus.PUBLISHED, // TODO: support draft and pending publish when add new functionalities
    createdAt: serverTimestamp(), // in ISO format
    updatedAt: serverTimestamp(), // in ISO format
    pathToFile: pod.pathToFile,
    description: pod.description,
    published_date: Timestamp.fromDate(new Date(pod.published_date)), // in ISO format
  });

  // create usersPodcasts document
  await addDoc(collection(db, CREATORS_PODCASTS), {
    creatorId: doc(db, "users", userId),
    podcastId: doc(db, "podcasts", docRef.id),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
