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

import { Podcast, PopulatedPodcast } from "@/common/interfaces";
import { COLLECTIONS, PODCAST_FIELDS } from "@/common/enums";

import { db } from "../init";
import { populatePodcast } from "../utils";

export const getPodcastsByCategorySortedAndPaged = async ({
  offset,
  pageSize = 14,
  categories = [],
  sortBy = "createdAt",
}: {
  offset: any;
  sortBy?: string;
  pageSize?: number;
  categories?: string[];
}) => {
  const podcasts: PopulatedPodcast[] = [];

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
        where(PODCAST_FIELDS.CATEGORY, "in", subCategories)
      );
    }

    if (offset) {
      dynamicConditions.push(startAfter(offset.toISOString()));
    }

    // decide based on playCount in period
    // offset based on last createdAt
    const podcastsQuery = query(
      collection(db, COLLECTIONS.PODCASTS),
      orderBy(sortBy, "desc"),
      ...dynamicConditions,
      limit(pageSize)
    );

    const podcastsSnapshot = await getDocs(podcastsQuery);

    podcasts.push(
      ...(await Promise.all(
        podcastsSnapshot.docs.map((snapshot) =>
          populatePodcast({ id: snapshot.id, ...snapshot.data() } as Podcast)
        )
      ))
    );

    i++;
  } while (i < categories.length / 10 && podcasts.length < pageSize);

  return podcasts;
};
