import { collection, addDoc, setDoc, doc, Timestamp } from "firebase/firestore";

import { Collections } from "@/common/enums";

import { db } from "./init";
import { getUserInfo } from "./getUserInfo";

import type { UserCreationData } from "@/common/interfaces";

// TODO: Add user avatar
export const createUserDocument = async (user: UserCreationData) => {
  const { gender, uid, name, dob, role, categoriesOfInterest } = user;
  let timestampDob: Timestamp | undefined;

  if (dob) {
    timestampDob = Timestamp.fromDate(dob);
  }

  const userObj = {
    name,
    roles: [role],
    categoriesOfInterest,
    gender: gender ?? null,
    dob: timestampDob ?? null,
    photoURL: user.photoURL ?? null,
    searchKeywords: name.toLowerCase().split(" "),
  };

  if (uid) {
    const userInfo = await getUserInfo(uid);

    if (userInfo) {
      return;
    }

    await setDoc(doc(db, Collections.USERS, uid), userObj);
  } else {
    await addDoc(collection(db, Collections.USERS), userObj);
  }
};
