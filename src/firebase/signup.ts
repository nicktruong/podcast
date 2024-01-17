import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { Roles } from "@/common/constants/roles";
import { IUserRegister } from "@/common/interfaces";

import { auth } from "./init";
import { createUserDoc } from "./create-user-doc";

export const signup = async (user: IUserRegister) => {
  try {
    const { user: signedUpUser } = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const { name, date, year, email, month, gender, categoriesOfInterest } =
      user;

    await createUserDoc({
      name,
      email,
      gender,
      role: Roles.LISTENER,
      uid: signedUpUser.uid,
      dob: new Date(+year, +month, +date),
      categoriesOfInterest,
    });

    await sendEmailVerification(signedUpUser);
  } catch (error) {
    // TODO: handle error && add toast
    console.error("Sign up fail: ", error);
  }
};
