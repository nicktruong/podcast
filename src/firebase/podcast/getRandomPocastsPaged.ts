import {
  query,
  limit,
  where,
  getDocs,
  collection,
  WhereFilterOp,
} from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";

import { COLLECTIONS } from "@/common/enums";
import { PODCAST_FIELDS } from "@/common/fields";

import { db } from "../init";
import { downloadFile } from "../storage";

import { populatePodcastWithAuthor } from "./populatePodcastWithAuthor";

import type { Podcast, PopulatedPodcastWithAuthor } from "@/common/interfaces";

const generateQuery = ({
  random,
  pageSize,
  condition,
  categories,
}: {
  random: string;
  pageSize: number;
  categories: string[];
  condition: WhereFilterOp;
}) => {
  const categoryCondition = categories.length
    ? [where(PODCAST_FIELDS.CATEGORY, "in", categories)]
    : [];

  return query(
    collection(db, COLLECTIONS.PODCASTS),
    ...categoryCondition,
    where(PODCAST_FIELDS.RANDOM, condition, random),
    limit(pageSize)
  );
};

export const getRandomPocastsPaged = async ({
  pageSize = 4,
  categories = [],
}: {
  pageSize?: number;
  categories?: string[];
}) => {
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
