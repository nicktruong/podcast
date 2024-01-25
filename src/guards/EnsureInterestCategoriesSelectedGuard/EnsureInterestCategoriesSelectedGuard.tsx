import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/common/constants";

import { usePrepare } from "./usePrepare";

const EnsureInterestCategoriesSelectedGuard = () => {
  const { userId, fetchingCategories, userCategoriesOfInterest } = usePrepare();

  if (fetchingCategories) {
    return <>Loading...</>;
  }

  if (userId && !userCategoriesOfInterest?.length) {
    return <Navigate to={routes.categoriesSelection} replace />;
  }

  return <Outlet />;
};

export default EnsureInterestCategoriesSelectedGuard;
