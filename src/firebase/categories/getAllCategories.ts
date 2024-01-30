import { collection, getDocs } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { CategoryRaw } from "@/common/interfaces";

export const fetchAllCategories = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTIONS.CATEGORIES));

  const { categories } = querySnapshot.docs[0].data() as CategoryRaw;

  return categories;
};
