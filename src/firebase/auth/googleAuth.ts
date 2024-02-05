import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import { auth } from "../init";

const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/userinfo.email");
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

// TODO: Consider using device language with firebase login
export const loginRedirectWithGoogle = async () => {
  await signInWithRedirect(auth, provider);
};
