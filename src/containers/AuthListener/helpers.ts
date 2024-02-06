import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { routes } from "@/constants";
import { auth, getUserInfo } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchNotifications } from "@/store/notification";
import { setUser, setLoading, selectIsUserLoading } from "@/store/user";
import { getCategories, selectFetchingCategories } from "@/store/category";

export const usePrepareHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialLoading = useAppSelector(selectIsUserLoading);
  const fetchingCategories = useAppSelector(selectFetchingCategories);

  useEffect(() => {
    // Fetch user's interest categories
    dispatch(getCategories());

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // If user not logged in => no need to load user
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

      // Fetch notification for logged in users
      dispatch(fetchNotifications(uid));

      // Finish loading user
      dispatch(setLoading(false));

      // User must have categoriesOfInterest before using the app
      if (!userInfo?.categoriesOfInterest) navigate(routes.categoriesSelection);
    });
  }, []);

  return { initialLoading, fetchingCategories };
};
