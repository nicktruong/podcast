import { useEffect } from "react";

import {
  setUser,
  setLoading,
  selectInitialUserDataLoading,
} from "@/store/user";
import { auth, getUserInfo } from "@/firebase";
import { fetchCategories, selectFetchingCategories } from "@/store/category";
import { useAppDispatch, useAppSelector } from "@/hooks";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const fetchingCategories = useAppSelector(selectFetchingCategories);

  const initialLoading = useAppSelector(selectInitialUserDataLoading);

  useEffect(() => {
    const init = async () => {
      // fetch user's interest categories
      await dispatch(fetchCategories());
    };

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

    init();
  }, []);

  return { initialLoading, fetchingCategories };
};
