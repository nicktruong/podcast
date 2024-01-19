import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/common/constants";
import { selectUserId } from "@/store/user";
import { useAppSelector } from "@/hooks/redux";

export default function PreventLoggedInAccessGuard() {
  const userId = useAppSelector(selectUserId);

  if (userId) {
    return <Navigate to={routes.index} replace />;
  }

  return <Outlet />;
}
