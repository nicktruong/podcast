import { PodStatus } from "../constants/pod-status";

export interface Pod {
  id: string;
  title: string;
  rating: number;
  seriesId: string;
  playCount: number;
  status: PodStatus;
  createdAt: string; // in ISO format
  updatedAt: string; // in ISO format
  pathToFile: string;
  description: string;
  published_date: string; // in ISO format
}
