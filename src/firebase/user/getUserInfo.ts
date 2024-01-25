import { doc, getDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";
import { downloadFileFromStorage } from "../storage";

import type { User } from "@/common/interfaces";

export const getUserInfo = async (uid: string): Promise<User | undefined> => {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return;
  }

  const user = { id: userSnapshot.id, ...userSnapshot.data() } as User;

  if (!user.photoURL.startsWith("https")) {
    user.photoURL = await downloadFileFromStorage(user.photoURL);
  }

  return user;
};
