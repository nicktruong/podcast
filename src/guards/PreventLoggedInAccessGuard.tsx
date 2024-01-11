import { Navigate, Outlet } from "react-router-dom";

import routes from "@/common/constants/routes";
import { useAppSelector } from "@/hooks/storeHooks";
import { selectUser } from "@/store/userSlice";

export default function PreventLoggedInAccessGuard() {
  const user = useAppSelector(selectUser);

  if (user.uid) {
    return <Navigate to={routes.index} replace />;
  }

  return <Outlet />;
}
