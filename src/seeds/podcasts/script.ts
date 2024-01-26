import { faker } from "@faker-js/faker";
import { nanoid } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase";
import { COLLECTIONS, GENDERS, PodcastStatus, ROLES } from "@/common/enums";
import { Episode, Podcast, User } from "@/common/interfaces";

import categories from "../categories/categories.json";

import episodesJSON from "./episodes.json";
import podcastsJSON from "./podcasts.json";

const seedDateString = new Date().toISOString();

const createRandomPodcast = ({
  index,
  rating,
  authorId,
  rateCount,
  playCount,
  audienceSize,
}: {
  index: number;
  rating: number;
  authorId: string;
  rateCount: number;
  playCount: number;
  audienceSize: number;
}): Omit<Podcast, "id"> => {
  // Only fill 5 categories
  const randomCategoryId = faker.helpers.arrayElement(
    categories.slice(0, 5)
  ).name;

  return {
    rating,
    authorId,
    rateCount,
    playCount,
    audienceSize,
    random: nanoid(),
    createdAt: seedDateString,
    updatedAt: seedDateString,
    category: randomCategoryId,
    title: podcastsJSON[index].title,
    description: podcastsJSON[index].description,
    coverUrl: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
    // searchKeywords: podcastsJSON[index].title.toLowerCase().split(" "), // TODO: gen keywords
  };
};

const createRandomEpisode = ({
  index,
  authorId,
  podcastId,
}: {
  index: number;
  authorId: string;
  podcastId: string;
}): Omit<Episode, "id"> => {
  const playCount = faker.number.int({ max: 100_000 });
  const rateCount = faker.number.int({ max: playCount });
  const rating = faker.number.float({ max: 5, precision: 0.1 });

  return {
    rating,
    authorId,
    podcastId, // change when user first create series
    rateCount,
    playCount,
    audienceSize: playCount,
    createdAt: seedDateString,
    updatedAt: seedDateString,
    title: episodesJSON[index].title,
    publishedDate: seedDateString,
    status: PodcastStatus.PUBLISHED, // TODO: support draft and pending publish when add new functionalities
    pathToFile: "audios/seed-audio.mp3",
    description: episodesJSON[index].description,
  };
};

const createRandomPodcaster = (episodeCount: number): Omit<User, "id"> => {
  const name = faker.person.fullName();

  const categoriesOfInterest = faker.helpers.arrayElements(
    categories.slice(5).map(({ name }) => name),
    { min: 3, max: 5 }
  );

  return {
    name,
    history: [],
    episodeCount,
    following: [],
    emailVerified: true,
    categoriesOfInterest,
    bio: faker.person.bio(),
    createdAt: seedDateString,
    updatedAt: seedDateString,
    email: faker.internet.email(),
    roles: [ROLES.LISTENER, ROLES.PODCASTER],
    // searchKeywords: name.toLowerCase().split(" "), // TODO: gen keywords
    dob: faker.date.birthdate().toISOString(),
    gender: faker.helpers.arrayElement(Object.values(GENDERS)),
    photoURL: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
  };
};

export const migrate = async () => {
  console.log("Begin podcasters migration");

  for (let i = 0; i < podcastsJSON.length; i++) {
    // create random episodes for a podcast
    const episodes: ReturnType<typeof createRandomEpisode>[] = [];
    const episodeCount = faker.number.int({ min: 1, max: 6 });

    // create random podcaster
    const podcaster = createRandomPodcaster(episodeCount);
    const podcasterDoc = await addDoc(
      collection(db, COLLECTIONS.USERS),
      podcaster
    );
    console.log("Seeded podcaster");
    console.log("=======================================\n");

    for (let j = 0; j < episodeCount; j++) {
      episodes.push(
        createRandomEpisode({
          authorId: "",
          podcastId: "",
          index: faker.number.int({ max: episodesJSON.length - 1 }),
        })
      );
    }

    // Calculate stats for podcast
    const audienceSize = episodes.reduce(
      (acc, currEpisode) => acc + currEpisode.audienceSize,
      0
    );

    const playCount = episodes.reduce(
      (acc, currEpisode) => acc + currEpisode.playCount,
      0
    );

    const rateCount = episodes.reduce(
      (acc, currEpisode) => acc + currEpisode.rateCount,
      0
    );

    const rating = +(
      episodes.reduce(
        (acc, currEpisode) => acc + (currEpisode.rating ?? 0),
        0
      ) / episodeCount
    ).toFixed(1);

    // create random podcast
    const podcast = createRandomPodcast({
      rating,
      playCount,
      rateCount,
      audienceSize,
      authorId: podcasterDoc.id,
      index: faker.number.int({ max: podcastsJSON.length - 1 }),
    });

    const podcastDoc = await addDoc(
      collection(db, COLLECTIONS.PODCASTS),
      podcast
    );
    console.log("Seeded podcast");
    console.log("=======================================\n");

    // attach podcast id and author id to each episode
    episodes.forEach((episode) => (episode.podcastId = podcastDoc.id));
    episodes.forEach((episode) => (episode.authorId = podcasterDoc.id));

    await Promise.all(
      episodes.map((episode) =>
        addDoc(collection(db, COLLECTIONS.EPISODES), episode)
      )
    );
    console.log("Seeded episodes");
    console.log("=======================================\n");
  }

  console.log("Done migration");
};
