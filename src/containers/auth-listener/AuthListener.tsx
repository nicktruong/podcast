import { PropsWithChildren, useEffect } from "react";

import {
  setLoading,
  getUserInfoAction,
  selectInitialUserDataLoading,
} from "@/store/userSlice";
import { auth } from "@/firebase/init";
import { Roles } from "@/common/constants/roles";
import { checkUserExists } from "@/firebase/utils";
import { createUserDoc } from "@/firebase/create-user-doc";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";

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
          role: Roles.LISTENER,
          name: user.displayName,
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
