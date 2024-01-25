import { nanoid } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { Podcast, PodcastCreationData } from "@/common/interfaces";

export const createPodcast = async (data: PodcastCreationData) => {
  // create podcast
  const currentDate = new Date().toISOString();

  const podcast: Omit<Podcast, "id"> = {
    rating: null,
    playCount: 0,
    rateCount: 0,
    audienceSize: 0,
    random: nanoid(),
    title: data.title,
    createdAt: currentDate,
    updatedAt: currentDate,
    authorId: data.authorId,
    category: data.category,
    coverUrl: data.coverUrl,
    description: data.description,
  };

  const docRef = await addDoc(collection(db, COLLECTIONS.PODCASTS), podcast);

  return { ...podcast, id: docRef.id };
};
