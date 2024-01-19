import { Outlet } from "react-router-dom";

import { Roles } from "@/common/enums";
import { selectUserId, selectUserRoles } from "@/store/user";
import { useAppSelector } from "@/hooks/redux";

export default function PreventListenerAccessGuard() {
  const userId = useAppSelector(selectUserId);
  const userRoles = useAppSelector(selectUserRoles);

  if (!userId || !userRoles.includes(Roles.PODCASTER)) {
    return <>404 Not Found</>;
  }

  return <Outlet />;
}
