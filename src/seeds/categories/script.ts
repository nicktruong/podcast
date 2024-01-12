import {
  FieldValue,
  addDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/init";

import categories from "./categories-seed.json";

const seedTimestamp = serverTimestamp();

interface Category {
  title: string;
  description: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

const addCategory = (category: Category) => {
  return addDoc(collection(db, "categories"), category);
};

const addChildCategory = ({
  parentId,
  childId,
}: {
  parentId: string;
  childId: string;
}) => {
  return addDoc(collection(db, "childCategories"), {
    parentId: doc(db, "users", parentId),
    childId: doc(db, "users", childId),
  });
};

const migrate = async () => {
  for (const key of Object.keys(categories)) {
    const parentDocument = await addCategory({
      title: key,
      description: "",
      createdAt: seedTimestamp,
      updatedAt: seedTimestamp,
    });

    console.log(`Parent Category ${key} added`);

    (categories as { [key: string]: string[] })[key].forEach(
      async (category) => {
        const childDocument = await addCategory({
          title: category,
          description: "",
          createdAt: seedTimestamp,
          updatedAt: seedTimestamp,
        });
        console.log(`Child Category ${category} added`);

        await addChildCategory({
          parentId: parentDocument.id,
          childId: childDocument.id,
        });

        console.log(`Relationship between ${key} and ${category} added`);
      }
    );
  }

  console.log("Done categories migration");
  process.exit();
};

migrate();
