import { faker } from "@faker-js/faker";
import { nanoid } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase";
import { IMAGE_SIZE } from "@/constants";
import { Collections, Genders, PodcastStatus, Roles } from "@/enums";
// import { generateKeywords } from "@/common/utils";

import categories from "../categories/categories.json";

import episodesJSON from "./episodes.json";
import podcastsJSON from "./podcasts.json";

import type {
  CreateRandomEpisodeOptions,
  CreateRandomPodcastOptions,
} from "./interfaces";
import type { Episode, Podcast, User } from "@/common/interfaces";

const seedDateString = new Date().toISOString();

const createRandomPodcast = ({
  index,
  rating,
  authorId,
  rateCount,
  playCount,
  episodeCount,
  audienceSize,
}: CreateRandomPodcastOptions): Omit<Podcast, "id"> => {
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
    noOfEpisodes: episodeCount,
    title: podcastsJSON[index].title,
    description: podcastsJSON[index].description,
    // keywords: generateKeywords(podcastsJSON[index].title),
    coverUrl: faker.image.urlPicsumPhotos({
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    }),
  };
};

const createRandomEpisode = ({
  no,
  index,
  authorId,
  podcastId,
}: CreateRandomEpisodeOptions): Omit<Episode, "id"> => {
  const playCount = faker.number.int({ max: 100_000 });
  const rateCount = faker.number.int({ max: playCount });
  const rating = faker.number.float({ max: 5, precision: 0.1 });

  return {
    no,
    rating,
    authorId,
    podcastId, // Change when user first create series
    rateCount,
    playCount,
    audienceSize: playCount,
    createdAt: seedDateString,
    updatedAt: seedDateString,
    publishedDate: seedDateString,
    title: episodesJSON[index].title,
    status: PodcastStatus.PUBLISHED, // TODO: support draft and pending publish when add new functionalities
    pathToFile: "audios/seed-audio.mp3",
    description: episodesJSON[index].description,
    pathToImgFile: faker.image.urlPicsumPhotos({
      height: IMAGE_SIZE,
      width: IMAGE_SIZE,
    }),
    // keywords: generateKeywords(podcastsJSON[index].title),
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
    played: [],
    history: [],
    episodeCount,
    following: [],
    emailVerified: true,
    categoriesOfInterest,
    bio: faker.person.bio(),
    createdAt: seedDateString,
    updatedAt: seedDateString,
    email: faker.internet.email(),
    roles: [Roles.LISTENER, Roles.PODCASTER],
    // searchKeywords: name.toLowerCase().split(" "), // TODO: gen keywords
    dob: faker.date.birthdate().toISOString(),
    gender: faker.helpers.arrayElement(Object.values(Genders)),
    photoURL: faker.image.urlPicsumPhotos({
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    }),
  };
};

export const migrate = async () => {
  console.log("Begin podcasters migration");

  let usedEpisodes: number = 0; // Prevent duplicate episodes from multiple podcasts

  for (
    let i = 0;
    i < podcastsJSON.length && usedEpisodes < episodesJSON.length;
    i++
  ) {
    const remainedEpisodes = episodesJSON.length - usedEpisodes;
    const episodeCount = faker.number.int({
      min: 1,
      max: 6 < remainedEpisodes ? 6 : remainedEpisodes,
    }); // Create the number of episodes this podcaster has
    const episodes: ReturnType<typeof createRandomEpisode>[] = [];

    // Create random podcaster
    const podcaster = createRandomPodcaster(episodeCount);
    const podcasterDoc = await addDoc(
      collection(db, Collections.USERS),
      podcaster
    );
    console.log("Seeded podcaster");
    console.log("=======================================\n");

    // Create random episodes
    for (let j = 0; j < episodeCount; j++) {
      episodes.push(
        createRandomEpisode({
          no: j + 1,
          authorId: "",
          podcastId: "",
          index: j + usedEpisodes, // faker.number.int({ max: episodesJSON.length - 1 }),
        })
      );
    }

    usedEpisodes += episodeCount;

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
      index: i,
      playCount,
      rateCount,
      audienceSize,
      episodeCount,
      authorId: podcasterDoc.id,
    });

    const podcastDoc = await addDoc(
      collection(db, Collections.PODCASTS),
      podcast
    );
    console.log("Seeded podcast");
    console.log("=======================================\n");

    // attach podcast id and author id to each episode
    episodes.forEach((episode) => (episode.podcastId = podcastDoc.id));
    episodes.forEach((episode) => (episode.authorId = podcasterDoc.id));

    await Promise.all(
      episodes.map((episode) =>
        addDoc(collection(db, Collections.EPISODES), episode)
      )
    );
    console.log("Seeded episodes");
    console.log("=======================================\n");
  }

  console.log("Done migration");
};
