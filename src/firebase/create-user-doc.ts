import { collection, addDoc, setDoc, doc, Timestamp } from "firebase/firestore";

import { CreateUserDoc } from "@/common/interfaces/createUserDoc.interface";

import { db } from "./init";
import { checkUserExists } from "./utils";

export const createUserDoc = async (user: CreateUserDoc) => {
  const { gender, uid, name, dob, role, categoriesOfInterest } = user;
  let timestampDob: Timestamp | undefined;

  if (dob) {
    timestampDob = Timestamp.fromDate(dob);
  }

  if (uid) {
    const userExists = await checkUserExists(uid);

    if (userExists) {
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
