import type { WhereFilterOp } from "firebase/firestore";

export interface GenerateQueryOptions {
  random: string;
  pageSize: number;
  categories: string[];
  condition: WhereFilterOp;
}

export interface GetRandomPodcastsOptions {
  pageSize?: number;
  categories?: string[];
}

export interface GetTrendingPodcastsOptions {
  offset?: Date;
  period?: number;
  pageSize?: number;
  categories?: string[];
}
