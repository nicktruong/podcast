import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase";
import { Collections } from "@/common/enums";

import categories from "./categories.json";

export const migrate = async () => {
  console.log("Begin categories migration");

  await addDoc(collection(db, Collections.CATEGORIES), { categories });

  console.log("Seeded categories");

  console.log("Done categories migration");
  console.log("==================================");
};
