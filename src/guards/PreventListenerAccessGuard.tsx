import { Outlet } from "react-router-dom";

import { selectUser } from "@/store/userSlice";
import { Roles } from "@/common/constants/roles";
import { useAppSelector } from "@/hooks/storeHooks";

export default function PreventListenerAccessGuard() {
  const user = useAppSelector(selectUser);

  if (!user.uid || !user.roles.includes(Roles.podcaster)) {
    return <>404 Not Found</>;
  }

  return <Outlet />;
}
