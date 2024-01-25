/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";

import {
  setUser,
  setLoading,
  selectInitialUserDataLoading,
} from "@/store/user";
import { auth, getUserInfo } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchCategories } from "@/store/category";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const initialLoading = useAppSelector(selectInitialUserDataLoading);

  useEffect(() => {
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

      // fetch user's interest categories
      await dispatch(fetchCategories());

      // finish loading user
      dispatch(setLoading(false));
    });
  }, []);

  return { initialLoading };
};
