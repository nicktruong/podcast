import { useEffect } from "react";

import { auth, getUserInfo } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setUser,
  setLoading,
  selectUserId,
  selectIsUserLoading,
} from "@/store/user";
import { fetchNotifications } from "@/store/notification";
import { getCategories, selectFetchingCategories } from "@/store/category";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const fetchingCategories = useAppSelector(selectFetchingCategories);

  const initialLoading = useAppSelector(selectIsUserLoading);

  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    const init = async () => {
      // fetch user's interest categories
      await dispatch(getCategories());
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

  // TODO: Refactor guards, fetch notifications
  useEffect(() => {
    if (!userId) return;
    dispatch(fetchNotifications(userId));
  }, [userId]);

  return { initialLoading, fetchingCategories };
};
