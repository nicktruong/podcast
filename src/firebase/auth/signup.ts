import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { ROLES } from "@/common/enums";

import { auth } from "../init";
import { createUserDocument } from "../user/createUserDocument";

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
      photoURL: "",
      categoriesOfInterest,
      role: ROLES.LISTENER,
      uid: signedUpUser.uid,
      dob: new Date(+year, +month, +date),
    });

    await sendEmailVerification(signedUpUser);
  } catch (error) {
    // TODO: handle error && add toast
    console.error("Sign up fail: ", error);
  }
};
