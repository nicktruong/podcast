import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth, getUserInfo } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setUser, setLoading, selectIsUserLoading } from "@/store/user";
import { fetchNotifications } from "@/store/notification";
import { getCategories, selectFetchingCategories } from "@/store/category";
import { routes } from "@/common/constants";

export const usePrepare = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const fetchingCategories = useAppSelector(selectFetchingCategories);

  const initialLoading = useAppSelector(selectIsUserLoading);

  useEffect(() => {
    const init = async () => {
      // Fetch user's interest categories
      await dispatch(getCategories());
    };

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // If user not logged in => no need to load user
        dispatch(setLoading(false));

        return;
      }

      const { email, emailVerified, displayName, photoURL, uid } = user;

      // Fetch notification for logged in users
      dispatch(fetchNotifications(uid));

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

      // Finish loading user
      dispatch(setLoading(false));

      // User must have categoriesOfInterest before using the app
      if (!userInfo?.categoriesOfInterest) navigate(routes.categoriesSelection);
    });

    init();
  }, []);

  return { initialLoading, fetchingCategories };
};
