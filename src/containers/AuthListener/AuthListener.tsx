import { Outlet } from "react-router-dom";

import { usePrepare } from "./usePrepare";

export default function AuthListener() {
  const { initialLoading } = usePrepare();

  if (initialLoading) {
    return <>Loading...</>;
  }

  return <Outlet />;
}
