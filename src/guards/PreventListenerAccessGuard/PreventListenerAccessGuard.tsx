import { Outlet } from "react-router-dom";

import { ROLES } from "@/common/enums";
import { useAppSelector } from "@/hooks/redux";
import { selectUserId, selectUserRoles } from "@/store/user";

export default function PreventListenerAccessGuard() {
  const userId = useAppSelector(selectUserId);
  const userRoles = useAppSelector(selectUserRoles);

  if (!userId || !userRoles?.includes(ROLES.PODCASTER)) {
    return <>404 Not Found</>;
  }

  return <Outlet />;
}
