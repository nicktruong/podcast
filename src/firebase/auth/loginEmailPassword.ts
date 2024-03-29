import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../init";

import type { LoginData } from "@/common/interfaces";

export const loginEmailPassword = async ({ email, password }: LoginData) => {
  await signInWithEmailAndPassword(auth, email, password);
};
