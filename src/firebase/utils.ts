import { doc, getDoc } from "@firebase/firestore";

import { db } from "./init";

export const checkUserExists = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
};
