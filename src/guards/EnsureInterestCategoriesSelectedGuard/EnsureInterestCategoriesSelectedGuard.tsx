import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { routes } from "@/common/constants";
import { selectUserId, selectUserCategoriesOfInterest } from "@/store/user";

const EnsureInterestCategoriesSelectedGuard = () => {
  const userId = useAppSelector(selectUserId);
  const userCategoriesOfInterest = useAppSelector(
    selectUserCategoriesOfInterest
  );

  if (userId && userCategoriesOfInterest.length === 0) {
    return <Navigate to={routes.categoriesSelection} />;
  }

  return <Outlet />;
};

export default EnsureInterestCategoriesSelectedGuard;
