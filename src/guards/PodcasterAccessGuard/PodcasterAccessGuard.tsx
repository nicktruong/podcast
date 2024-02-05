import { Outlet } from "react-router-dom";

import { Roles } from "@/enums";
import { useAppSelector } from "@/hooks/redux";
import { selectUserId, selectUserRoles } from "@/store/user";

export default function PodcasterAccessGuard() {
  const userId = useAppSelector(selectUserId);
  const userRoles = useAppSelector(selectUserRoles);

  if (!userId || !userRoles?.includes(Roles.PODCASTER)) {
    return <>404 Not Found</>;
  }

  return <Outlet />;
}
