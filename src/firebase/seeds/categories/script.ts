import { writeFile } from "fs/promises";

import { darken } from "@mui/material";
import { faker } from "@faker-js/faker";
import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase";
import { Collections } from "@/common/enums";

import categories from "./categories.json";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const genCategoriesJSON = async () => {
  await writeFile(
    "./src/seeds/categories/categories.json",
    JSON.stringify(
      categories.map((category) => {
        return {
          ...category,
          color: darken(category.color, 0.2),
          imageUrl: faker.image.urlPicsumPhotos(),
        };
      }),
      null,
      2
    )
  );
};

export const migrate = async () => {
  console.log("Begin categories migration");

  await addDoc(collection(db, Collections.CATEGORIES), { categories });

  console.log("Seeded categories");

  console.log("Done categories migration");
  console.log("==================================");
};
