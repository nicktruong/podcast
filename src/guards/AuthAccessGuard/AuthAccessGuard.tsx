import { Navigate, Outlet } from "react-router-dom";

import { routes } from "@/constants";
import { selectUserId } from "@/store/user";
import { useAppSelector } from "@/hooks/redux";

export default function AuthAccessGuard() {
  const userId = useAppSelector(selectUserId);

  if (userId) {
    return <Navigate to={routes.index} replace />;
  }

  return <Outlet />;
}
