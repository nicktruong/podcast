import { nanoid } from "@reduxjs/toolkit";
import { query, limit, where, getDocs, collection } from "firebase/firestore";

import { Collections } from "@/common/enums";
import { PodcastFields } from "@/common/fields";

import { db } from "../init";
import { downloadFile } from "../storage";

import { populatePodcastWithAuthor } from "./populatePodcastWithAuthor";

import type {
  GenerateQueryOptions,
  GetRandomPodcastsOptions,
} from "./interfaces";
import type { Podcast, PopulatedPodcastWithAuthor } from "@/common/interfaces";

const generateQuery = ({
  random,
  pageSize,
  condition,
  categories,
}: GenerateQueryOptions) => {
  const categoryCondition = categories.length
    ? [where(PodcastFields.CATEGORY, "in", categories)]
    : [];

  return query(
    collection(db, Collections.PODCASTS),
    ...categoryCondition,
    where(PodcastFields.RANDOM, condition, random),
    limit(pageSize)
  );
};

export const getRandomPocastsPaged = async ({
  pageSize = 4,
  categories = [],
}: GetRandomPodcastsOptions) => {
  const podcasts: PopulatedPodcastWithAuthor[] = [];

  let i = 0;

  do {
    const random = nanoid();
    // query 2 times: >= and <= random
    const halfPageSize = Math.floor(pageSize / 2);

    const subCategories = categories.slice(i * 10, i * 10 + 10);

    const greaterThanQuery = generateQuery({
      random,
      condition: ">=",
      // period: podcastsPeriod,
      pageSize: halfPageSize,
      categories: subCategories,
    });

    const greaterThanSnapshot = await getDocs(greaterThanQuery);

    const lessThanQuery = generateQuery({
      random,
      condition: "<=",
      categories: subCategories,
      pageSize: pageSize - halfPageSize,
    });

    const lessThanSnapshot = await getDocs(lessThanQuery);

    const populated: Record<string, boolean> = {};

    const result = await Promise.all(
      greaterThanSnapshot.docs.concat(lessThanSnapshot.docs).map((snapshot) => {
        if (populated[snapshot.id]) {
          return;
        }

        populated[snapshot.id] = true;

        return populatePodcastWithAuthor({
          id: snapshot.id,
          ...snapshot.data(),
        } as Podcast);
      })
    );

    for (const populatedPodcat of result) {
      if (populatedPodcat) {
        if (
          populatedPodcat.coverUrl &&
          !populatedPodcat.coverUrl.startsWith("https")
        ) {
          populatedPodcat.coverUrl = await downloadFile(
            populatedPodcat.coverUrl
          );
        }

        podcasts.push(populatedPodcat);
      }
    }

    i++;
  } while (i < categories.length / 10 && podcasts.length < pageSize);

  return podcasts;
};
