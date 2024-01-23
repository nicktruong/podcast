import {
  getRedirectResult,
  signInWithRedirect,
  FacebookAuthProvider,
} from "firebase/auth";

import { auth } from "../init";

const provider = new FacebookAuthProvider();

provider.addScope("email");
provider.addScope("public_profile");

// auth.useDeviceLanguage()

export const loginRedirectWithFacebook = async () => {
  await signInWithRedirect(auth, provider);
};

export const getSignInUserWithFacebookRedirect = async () => {
  const result = await getRedirectResult(auth);

  return result?.user;
};
