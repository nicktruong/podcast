import { doc, getDoc, updateDoc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";
import { User } from "@/common/interfaces";

import { db } from "../init";

export const editProfile = async ({
  fullPath,
  name,
  bio,
  userId,
}: {
  fullPath?: string;
  name: string;
  bio?: string;
  userId: string;
}) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);

  const userSnapshot = await getDoc(userRef);

  const user = userSnapshot.data() as User;

  await updateDoc(userRef, { name, bio, photoURL: fullPath ?? user.photoURL });
};
