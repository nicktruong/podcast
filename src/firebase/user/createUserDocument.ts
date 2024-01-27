import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { COLLECTIONS } from "@/common/enums";

import { db } from "../init";

import { getUserInfo } from "./getUserInfo";

import type { UserCreationData } from "@/common/interfaces";

// TODO: Add user avatar
export const createUserDocument = async (user: UserCreationData) => {
  const { gender, uid, name, dob, role, categoriesOfInterest } = user;

  const userObj = {
    name,
    history: [],
    roles: [role],
    episodeCount: 0,
    categoriesOfInterest,
    gender: gender ?? null,
    dob: dob?.toISOString() ?? null,
    photoURL: user.photoURL ?? null,
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
