import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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

    await createUserDoc(user);

    await sendEmailVerification(signedUpUser);
  } catch (error) {
    // TODO: handle error
    console.error("Sign up fail: ", error);
  }
};
