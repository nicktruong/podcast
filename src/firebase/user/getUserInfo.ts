import { doc, getDoc } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "../init";
import { downloadFile } from "../storage";

import type { User } from "@/common/interfaces";

export const getUserInfo = async (uid: string): Promise<User | undefined> => {
  const userRef = doc(db, Collections.USERS, uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) return;

  const user = { id: userSnapshot.id, ...userSnapshot.data() } as User;

  if (user.photoURL && !user.photoURL.startsWith("https")) {
    user.photoURL = await downloadFile(user.photoURL);
  }

  return user;
};
