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
  const docRef = await addDoc(collection(db, PODCASTS), {
    title: pod.title,
    rating: null, // change when podcast get first rating
    seriesId: null, // change when user first create series
    playCount: 0,
    status: PodStatus.PUBLISHED, // TODO: support draft and pending publish when add new functionalities
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    pathToFile: pod.pathToFile,
    description: pod.description,
    publishedDate: Timestamp.fromDate(new Date(pod.publishedDate)),
  });

  const creatorsPodcasts = {
    creatorId: doc(db, "users", userId),
    podcastId: doc(db, "podcasts", docRef.id),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // create creatorsPodcasts document
  await addDoc(collection(db, CREATORS_PODCASTS), creatorsPodcasts);

  return {
    creatorId: creatorsPodcasts.creatorId.path,
    podcastId: creatorsPodcasts.podcastId.path,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};