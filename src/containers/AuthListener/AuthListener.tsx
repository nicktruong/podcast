import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import {
  setUser,
  setLoading,
  // selectInitialUserDataLoading,
} from "@/store/user";
import { auth, getUserInfo } from "@/firebase";
import { fetchCategories } from "@/store/category";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export default function AuthListener() {
  const dispatch = useAppDispatch();
  // const initialLoading = useAppSelector(selectInitialUserDataLoading);

  useEffect(() => {
    dispatch(fetchCategories());

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // if user not logged in => no need to load user
        dispatch(setLoading(false));

        return;
      }

      const { email, emailVerified, displayName, photoURL, uid } = user;

      const userInfo = await getUserInfo(uid);

      // set user information
      dispatch(
        setUser({
          id: uid,
          emailVerified,
          email: email ?? "",
          name: displayName ?? "",
          photoURL: photoURL ?? "",
          ...userInfo,
        })
      );

      // finish loading user
      dispatch(setLoading(false));
    });
  }, []);

  // if (initialLoading) {
  //   return <>Loading...</>;
  // }

  return <Outlet />;
}
