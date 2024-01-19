import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";

import { auth } from "./init";

const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/userinfo.email");
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

// auth.languageCode = ???

export const loginRedirectWithGoogle = async () => {
  await signInWithRedirect(auth, provider);
};

export const getSignInUserWithGoogleRedirect = async () => {
  const result = await getRedirectResult(auth);

  return result?.user;
};
