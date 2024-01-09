import { signInWithEmailAndPassword } from "firebase/auth";

import { IUserLogin } from "@/common/interfaces";

import { auth } from "./init";

export const loginWithEmailPassword = async ({
  email,
  password,
}: IUserLogin) => {
  await signInWithEmailAndPassword(auth, email, password);
};
