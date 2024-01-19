import { faker } from "@faker-js/faker";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import {
  USERS,
  PODCAST_SERIES,
  PODCASTS,
  CREATORS_PODCAST_SERIES,
  CREATORS_PODCASTS,
} from "@/common/constants/firestoreCollectionNames";
import { db } from "@/firebase/init";
import { Roles } from "@/common/constants/roles";
import { Genders } from "@/common/constants/genders";
import { PodStatus } from "@/common/constants/pod-status";

import categories from "../categories/categories.json";

import podcastSeries from "./podcast-series.json";
import podcasts from "./podcasts.json";

const seedTimestamp = serverTimestamp();

const createRandomPodcastersObj = () => {
  return {
    name: faker.person.fullName(),
    dob: Timestamp.fromDate(faker.date.birthdate()),
    roles: [Roles.LISTENER, Roles.PODCASTER],
    gender: faker.helpers.arrayElement(Object.values(Genders)),
  };
};

const createRandomPodcastSeriesObj = (
  index: number,
  {
    rating,
    rateCount,
    playCount,
  }: {
    rating: number;
    rateCount: number;
    playCount: number;
  }
) => {
  const randomCategoryId = faker.helpers.arrayElement(categories).name;

  return {
    coverUrl: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    title: podcastSeries[index].title,
    description: podcastSeries[index].description,
    category: randomCategoryId,
    rating,
    rateCount,
    playCount,
    audienceSize: faker.number.int({ max: 70_000 }),
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
  };
};

const populateCreatorsPodcastSeries = (userId: string, seriesId: string) => {
  return {
    creatorId: doc(db, USERS, userId),
    seriesId: doc(db, PODCAST_SERIES, seriesId),
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
  };
};

const createRandomPodcastObj = (
  index: number,
  seriesId: string,
  {
    rating,
    rateCount,
    playCount,
  }: {
    rating: number;
    rateCount: number;
    playCount: number;
  }
) => {
  return {
    title: podcasts[index].title,
    rating,
    seriesId, // change when user first create series
    rateCount,
    playCount,
    status: PodStatus.PUBLISHED, // TODO: support draft and pending publish when add new functionalities
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
    pathToFile: "audios/seed-audio.mp3",
    description: podcasts[index].description,
    publishedDate: seedTimestamp,
  };
};

const populateCreatorsPodcasts = (userId: string, podcastId: string) => {
  return {
    creatorId: doc(db, USERS, userId),
    podcastId: doc(db, PODCASTS, podcastId),
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
  };
};

export const migrate = async () => {
  console.log("Begin podcasters migration");

  for (let i = 0; i < podcastSeries.length; i++) {
    const rating = faker.number.float({ max: 5, precision: 0.1 });
    const playCount = faker.number.int({ max: 100_000 });
    const rateCount = faker.number.int({ max: playCount });

    // create podcasters
    const podcaster = createRandomPodcastersObj();
    const podcasterRef = await addDoc(collection(db, USERS), podcaster);
    console.log("Seeded pocaster");

    // create podcastSeries
    const podcastSeries = createRandomPodcastSeriesObj(i, {
      rating,
      rateCount,
      playCount,
    });
    const podcastSeriesRef = await addDoc(
      collection(db, PODCAST_SERIES),
      podcastSeries
    );
    console.log("Seeded pocaster series");

    // create creatorsPodcastSeries
    const creatorsPodcastSeries = populateCreatorsPodcastSeries(
      podcasterRef.id,
      podcastSeriesRef.id
    );
    await addDoc(
      collection(db, CREATORS_PODCAST_SERIES),
      creatorsPodcastSeries
    );
    console.log("Seeded creators podcastseries");

    // create podcast
    const podcast = createRandomPodcastObj(
      faker.number.int({ max: 59 }),
      podcastSeriesRef.id,
      { rating, rateCount, playCount }
    );
    const podcastRef = await addDoc(collection(db, PODCASTS), podcast);
    console.log("Seeded podcast");

    // create creatorsPodcasts
    const creatorsPodcasts = populateCreatorsPodcasts(
      podcasterRef.id,
      podcastRef.id
    );
    await addDoc(collection(db, CREATORS_PODCASTS), creatorsPodcasts);
    console.log("Seeded creatorsPodcasts");
    console.log("=====================================");
  }

  console.log("Done podcasters migration");
};
