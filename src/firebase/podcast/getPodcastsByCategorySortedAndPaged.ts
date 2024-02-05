import {
  limit,
  query,
  where,
  getDocs,
  orderBy,
  collection,
  startAfter,
  QueryStartAtConstraint,
  QueryFieldFilterConstraint,
} from "firebase/firestore";

import { Collections } from "@/common/enums";
import { PodcastFields } from "@/common/fields";

import { db } from "../init";
import { downloadFile } from "../storage";

import { populatePodcastWithAuthor } from "./populatePodcastWithAuthor";

import type {
  Podcast,
  PopulatedPodcastWithAuthor,
  GetPodcastsByCategoriesOption,
} from "@/common/interfaces";

export const getPodcastsByCategorySortedAndPaged = async ({
  offset,
  pageSize = 14,
  categories = [],
  sortBy = "createdAt",
}: GetPodcastsByCategoriesOption) => {
  const podcasts: PopulatedPodcastWithAuthor[] = [];

  let i = 0;

  do {
    const subCategories = categories.slice(i * 10, i * 10 + 10);

    // firestore does not allow "in" to be used with empty array
    const dynamicConditions: (
      | QueryFieldFilterConstraint
      | QueryStartAtConstraint
    )[] = [];

    if (subCategories.length) {
      dynamicConditions.push(
        where(PodcastFields.CATEGORY, "in", subCategories)
      );
    }

    if (offset) {
      dynamicConditions.push(startAfter(offset.toISOString()));
    }

    // decide based on playCount in period
    // offset based on last createdAt
    const podcastsQuery = query(
      collection(db, Collections.PODCASTS),
      orderBy(sortBy, "desc"),
      ...dynamicConditions,
      limit(pageSize)
    );

    const podcastsSnapshot = await getDocs(podcastsQuery);

    podcasts.push(
      ...((
        await Promise.all(
          podcastsSnapshot.docs.map(async (snapshot) => {
            const populatedPodcast = await populatePodcastWithAuthor({
              id: snapshot.id,
              ...snapshot.data(),
            } as Podcast);

            if (!populatedPodcast) return;

            if (
              populatedPodcast.coverUrl &&
              !populatedPodcast.coverUrl.startsWith("https")
            ) {
              populatedPodcast.coverUrl = await downloadFile(
                populatedPodcast.coverUrl
              );
            }

            return populatedPodcast;
          })
        )
      ).filter(Boolean) as PopulatedPodcastWithAuthor[])
    );

    i++;
  } while (i < categories.length / 10 && podcasts.length < pageSize);

  return podcasts;
};
