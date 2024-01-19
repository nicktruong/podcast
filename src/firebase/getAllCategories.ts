import { collection, getDocs } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";

import type { Category } from "@/common/interfaces";

export const getAllCategories = async () => {
  const querySnapshot = await getDocs(collection(db, Collections.CATEGORIES));

  // TODO: Change category document structure for optimizing read counts
  const categories = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return data;
  }) as Category[];

  return categories[0];
};
