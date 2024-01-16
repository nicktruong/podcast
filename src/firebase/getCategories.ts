import { collection, getDocs } from "firebase/firestore";

import { Category } from "@/common/interfaces/Category";
import { CATEGORIES } from "@/common/constants/firestoreCollectionNames";

import { db } from "./init";

export const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, CATEGORIES));

  // TODO: Change category document structure for optimizing read counts
  const categories = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    data.id = doc.id;
    data.createdAt = data.createdAt.toDate().toISOString();
    data.updatedAt = data.updatedAt.toDate().toISOString();

    return data;
  }) as Category[];

  return categories;
};
