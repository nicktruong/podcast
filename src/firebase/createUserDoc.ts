import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { CreateUserDoc } from "@/common/interfaces/createUserDoc.interface";

import { db } from "./init";
import { checkUserExists } from "./utils";

export const createUserDoc = async (user: CreateUserDoc) => {
  try {
    const { gender, uid, name, dob, role } = user;

    if (uid) {
      const userExists = await checkUserExists(uid);

      if (userExists) {
        return;
      }

      await setDoc(doc(db, "users", uid), {
        name,
        roles: [role],
        dob: dob ?? null,
        gender: gender ?? null,
      });
    } else {
      await addDoc(collection(db, "users"), {
        name,
        roles: [role],
        dob: dob ?? null,
        gender: gender ?? null,
      });
    }
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};
