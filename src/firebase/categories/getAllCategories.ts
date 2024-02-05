import { collection, getDocs, limit, query } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";

import type { Categories, CategoryDocData } from "@/common/interfaces";

export const fetchAllCategories = async (): Promise<Categories | undefined> => {
  const snapshot = await getDocs(
    query(collection(db, Collections.CATEGORIES), limit(1))
  );

  const doc = snapshot.docs.at(0);

  if (!doc?.exists()) return;

  const { categories } = doc.data() as CategoryDocData;

  return categories;
};
