import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { ROLES } from "@/common/enums";

import { auth } from "../init";
import { createUserDocument } from "../user";

import type { RegisterData } from "@/common/interfaces";

export const signup = async (user: RegisterData): Promise<void> => {
  const {
    name,
    date,
    year,
    month,
    email,
    gender,
    password,
    categoriesOfInterest,
  } = user;

  const { user: signedUpUser } = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUserDocument({
    name,
    email,
    gender,
    photoURL: "",
    categoriesOfInterest,
    role: ROLES.LISTENER,
    uid: signedUpUser.uid,
    dob: new Date(+year, +month, +date),
  });

  await sendEmailVerification(signedUpUser);
};
