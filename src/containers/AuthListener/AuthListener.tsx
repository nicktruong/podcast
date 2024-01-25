import * as Sentry from "@sentry/react";
import { Outlet } from "react-router-dom";

import Error from "@/pages/Error";

import { usePrepare } from "./usePrepare";

const AuthListener = () => {
  const { initialLoading } = usePrepare();

  if (initialLoading) {
    return <>Loading...</>;
  }

  return <Outlet />;
};

export default Sentry.withErrorBoundary(AuthListener, {
  fallback: ({ error, resetError }) => (
    <Error error={error} resetError={resetError} />
  ),
});
