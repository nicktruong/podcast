import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
  documentId,
} from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { Podcast, User } from "@/common/interfaces";

import { db } from "../init";

export const getSeriesById = async ({ seriesId }: { seriesId: string }) => {};
