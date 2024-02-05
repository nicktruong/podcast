import { collection, getDocs, limit, query } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { Categories, CategoryRaw } from "@/common/interfaces";

export const fetchAllCategories = async (): Promise<Categories | undefined> => {
  const snapshot = await getDocs(
    query(collection(db, COLLECTIONS.CATEGORIES), limit(1))
  );

  const doc = snapshot.docs.at(0);

  if (!doc?.exists()) return;

  const { categories } = doc.data() as CategoryRaw;

  return categories;
};
