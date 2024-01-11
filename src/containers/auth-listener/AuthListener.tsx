import { PropsWithChildren, useEffect } from "react";

import { auth } from "@/firebase/init";
import {
  getUserInfoAction,
  selectInitialUserDataLoading,
  setLoading,
} from "@/store/userSlice";
import { checkUserExists } from "@/firebase/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { createUserDoc } from "@/firebase/createUserDoc";
import { Roles } from "@/common/constants/roles";

export default function AuthListener({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const initialLoading = useAppSelector(selectInitialUserDataLoading);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(setLoading(false));

        return;
      }

      const { email, emailVerified, displayName, photoURL, uid } = user;

      // if user is logged in but haven't had
      // a corresponding user document then create one
      const userExists = await checkUserExists(user.uid);

      if (!userExists && user.email && user.displayName) {
        await createUserDoc({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          role: Roles.listener,
        });
      }

      dispatch(
        getUserInfoAction({
          uid,
          emailVerified,
          email: email ?? "",
          photoURL: photoURL ?? "",
          displayName: displayName ?? "",
        })
      );
    });
  });

  if (initialLoading) {
    return <>Loading...</>;
  }

  return children;
}
