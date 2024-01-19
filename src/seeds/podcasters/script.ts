import {
  doc,
  addDoc,
  Timestamp,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { faker } from "@faker-js/faker";

import { db } from "@/firebase";
import { Roles, Genders, Collections, PodcastStatus } from "@/common/enums";

import categories from "../categories/categories.json";

import podcasts from "./podcasts.json";
import podcastSeries from "./podcast-series.json";

const seedTimestamp = serverTimestamp();

const createRandomPodcastersObj = () => {
  return {
    name: faker.person.fullName(),
    roles: [Roles.LISTENER, Roles.PODCASTER],
    dob: Timestamp.fromDate(faker.date.birthdate()),
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
  const randomCategoryId = faker.helpers.arrayElement(categories.slice(5)).name;

  return {
    rating,
    rateCount,
    playCount,
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
    category: randomCategoryId,
    title: podcastSeries[index].title,
    description: podcastSeries[index].description,
    audienceSize: faker.number.int({ max: 70_000 }),
    coverUrl: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
  };
};

const populateCreatorsPodcastSeries = (userId: string, seriesId: string) => {
  return {
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
    creatorId: doc(db, Collections.USERS, userId),
    seriesId: doc(db, Collections.PODCAST_SERIES, seriesId),
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
    rating,
    seriesId, // change when user first create series
    rateCount,
    playCount,
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
    title: podcasts[index].title,
    publishedDate: seedTimestamp,
    status: PodcastStatus.PUBLISHED, // TODO: support draft and pending publish when add new functionalities
    pathToFile: "audios/seed-audio.mp3",
    description: podcasts[index].description,
  };
};

const populateCreatorsPodcasts = (userId: string, podcastId: string) => {
  return {
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
    creatorId: doc(db, Collections.USERS, userId),
    podcastId: doc(db, Collections.PODCASTS, podcastId),
  };
};

export const migrate = async () => {
  console.log("Begin podcasters migration");

  for (let i = 0; i < podcastSeries.length; i++) {
    const playCount = faker.number.int({ max: 100_000 });
    const rateCount = faker.number.int({ max: playCount });
    const rating = faker.number.float({ max: 5, precision: 0.1 });

    // create podcasters
    const podcaster = createRandomPodcastersObj();
    const podcasterRef = await addDoc(
      collection(db, Collections.USERS),
      podcaster
    );
    console.log("Seeded pocaster");

    // create podcastSeries
    const podcastSeries = createRandomPodcastSeriesObj(i, {
      rating,
      rateCount,
      playCount,
    });
    const podcastSeriesRef = await addDoc(
      collection(db, Collections.PODCAST_SERIES),
      podcastSeries
    );
    console.log("Seeded pocaster series");

    // create creatorsPodcastSeries
    const creatorsPodcastSeries = populateCreatorsPodcastSeries(
      podcasterRef.id,
      podcastSeriesRef.id
    );
    await addDoc(
      collection(db, Collections.CREATORS_PODCAST_SERIES),
      creatorsPodcastSeries
    );
    console.log("Seeded creators podcastseries");

    // create podcast
    const podcast = createRandomPodcastObj(
      faker.number.int({ max: 59 }),
      podcastSeriesRef.id,
      { rating, rateCount, playCount }
    );
    const podcastRef = await addDoc(
      collection(db, Collections.PODCASTS),
      podcast
    );
    console.log("Seeded podcast");

    // create creatorsPodcasts
    const creatorsPodcasts = populateCreatorsPodcasts(
      podcasterRef.id,
      podcastRef.id
    );
    await addDoc(
      collection(db, Collections.CREATORS_PODCASTS),
      creatorsPodcasts
    );
    console.log("Seeded creatorsPodcasts");
    console.log("=====================================");
  }

  console.log("Done podcasters migration");
};
