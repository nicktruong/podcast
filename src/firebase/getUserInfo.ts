import { Timestamp, doc, getDoc } from "firebase/firestore";

import { User } from "@/common/interfaces/user.interface";

import { db } from "./init";

export const getUserInfo = async (uid: string) => {
  const ref = doc(db, "users", uid);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    return null;
  }

  const user = docSnap.data();

  user.dob = (user.dob as Timestamp).toDate().toISOString();

  return user as User;
};
