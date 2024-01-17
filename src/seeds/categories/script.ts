import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase/init";
import { CATEGORIES } from "@/common/constants/firestoreCollectionNames";

import categories from "./categories.json";

export const migrate = async () => {
  console.log("Begin categories migration");

  await addDoc(collection(db, CATEGORIES), { categories });

  console.log("Seeded categories");

  console.log("Done categories migration");
  console.log("==================================");
};
