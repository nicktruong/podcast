import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { Roles } from "@/common/enums";

import { auth } from "./init";
import { createUserDocument } from "./createUserDocument";

import type { RegisterData } from "@/common/interfaces";

export const signup = async (user: RegisterData) => {
  try {
    const { user: signedUpUser } = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const { name, date, year, email, month, gender, categoriesOfInterest } =
      user;

    await createUserDocument({
      name,
      email,
      gender,
      categoriesOfInterest,
      role: Roles.LISTENER,
      uid: signedUpUser.uid,
      dob: new Date(+year, +month, +date),
    });

    await sendEmailVerification(signedUpUser);
  } catch (error) {
    // TODO: handle error && add toast
    console.error("Sign up fail: ", error);
  }
};
