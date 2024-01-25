import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { User } from "@/common/interfaces";

export const getUserInfo = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return null;
  }

  return userSnapshot.data() as User;
};
