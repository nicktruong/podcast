import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/common/constants";

import { usePrepare } from "./usePrepare";

const EnsureInterestCategoriesSelectedGuard = () => {
  const { userId, userCategoriesOfInterest } = usePrepare();

  if (userId && userCategoriesOfInterest.length === 0) {
    return <Navigate to={routes.categoriesSelection} replace />;
  }

  return <Outlet />;
};

export default EnsureInterestCategoriesSelectedGuard;
