import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import { getUserInfo } from "./getUserInfo";

import type { User, UserCreationData } from "@/common/interfaces";

// TODO: Add user avatar
export const createUserDocument = async (user: UserCreationData) => {
  const {
    uid,
    dob,
    role,
    name,
    email,
    gender,
    photoURL,
    categoriesOfInterest,
  } = user;

  const userObj: Omit<User, "emailVerified" | "id" | "dob"> & {
    dob: string | null;
  } = {
    name,
    email,
    gender,
    bio: "",
    photoURL,
    history: [],
    roles: [role],
    following: [],
    episodeCount: 0,
    categoriesOfInterest,
    dob: dob?.toISOString() ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // searchKeywords: name.toLowerCase().split(" "),
  };

  if (uid) {
    const userInfo = await getUserInfo(uid);

    if (userInfo) {
      return;
    }

    await setDoc(doc(db, COLLECTIONS.USERS, uid), userObj);
  } else {
    await addDoc(collection(db, COLLECTIONS.USERS), userObj);
  }
};
