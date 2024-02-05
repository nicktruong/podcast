import { signInWithRedirect, FacebookAuthProvider } from "firebase/auth";

import { auth } from "../init";

const provider = new FacebookAuthProvider();

provider.addScope("email");
provider.addScope("public_profile");

// TODO: Consider using device language with firebase login
export const loginRedirectWithFacebook = async () => {
  await signInWithRedirect(auth, provider);
};
