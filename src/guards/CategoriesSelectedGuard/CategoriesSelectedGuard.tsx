import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/common/constants";

import { usePrepare } from "./usePrepare";

const CategoriesSelectedGuard = () => {
  const { userId, userCategoriesOfInterest } = usePrepare();

  if (userId && !userCategoriesOfInterest?.length) {
    return <Navigate to={routes.categoriesSelection} replace />;
  }

  return <Outlet />;
};

export default CategoriesSelectedGuard;
