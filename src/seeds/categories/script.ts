import { writeFile } from "fs/promises";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/firebase/init";
import { CATEGORIES } from "@/common/constants/firestoreCollectionNames";

import categories from "./categories.json";

const seedTimestamp = serverTimestamp();

const createCategoryObj = (category: string) => {
  return {
    name: category,
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
  };
};

export const migrate = async () => {
  console.log("Begin categories migration");
  const categoryObjs = [];

  for (const [category, subcategories] of Object.entries(categories)) {
    // Add the category itself as an object
    categoryObjs.push(createCategoryObj(category));

    // Add each subcategory as an object
    subcategories.forEach((subcategory) => {
      categoryObjs.push(createCategoryObj(subcategory));
    });
  }

  const response = await Promise.all(
    categoryObjs.map((category) => addDoc(collection(db, CATEGORIES), category))
  );

  console.log("Seeded categories");

  const seededData = JSON.stringify(
    categoryObjs.map((obj, index) => ({ id: response[index].id, ...obj })),
    (key, value) => {
      if (key === "createdAt" || key === "updatedAt") {
        return undefined;
      }

      return value;
    },
    2
  );

  await writeFile("./src/seeds/categories/seededData.json", seededData);

  console.log("Done categories migration");
  console.log("==================================");
};
