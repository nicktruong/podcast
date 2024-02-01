import { doc, getDoc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import type { User, UserEditProfileOptions } from "@/common/interfaces";

export const userEditProfile = async ({
  bio,
  name,
  userId,
  fullPath,
}: UserEditProfileOptions) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);

  const userSnapshot = await getDoc(userRef);

  const user = userSnapshot.data() as User;

  await updateDoc(userRef, {
    name,
    bio: bio ?? user.bio,
    photoURL: fullPath ?? user.photoURL,
  });
};
