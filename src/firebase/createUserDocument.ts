import { collection, addDoc, setDoc, doc, Timestamp } from "firebase/firestore";

import { db } from "./init";
import { getUserInfo } from "./getUserInfo";

import type { UserCreationData } from "@/common/interfaces";

export const createUserDocument = async (user: UserCreationData) => {
  const { gender, uid, name, dob, role, categoriesOfInterest } = user;
  let timestampDob: Timestamp | undefined;

  if (dob) {
    timestampDob = Timestamp.fromDate(dob);
  }

  if (uid) {
    const userInfo = await getUserInfo(uid);

    if (userInfo) {
      return;
    }

    await setDoc(doc(db, "users", uid), {
      name,
      roles: [role],
      dob: timestampDob ?? null,
      gender: gender ?? null,
      categoriesOfInterest,
    });
  } else {
    await addDoc(collection(db, "users"), {
      name,
      roles: [role],
      dob: timestampDob ?? null,
      gender: gender ?? null,
      categoriesOfInterest,
    });
  }
};
