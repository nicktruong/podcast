import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/common/constants";

import { usePrepareHook } from "./helpers";

const CategoriesSelectedGuard = () => {
  const { userId, userCategoriesOfInterest } = usePrepareHook();

  if (userId && !userCategoriesOfInterest?.length) {
    return <Navigate to={routes.categoriesSelection} replace />;
  }

  return <Outlet />;
};

export default CategoriesSelectedGuard;
