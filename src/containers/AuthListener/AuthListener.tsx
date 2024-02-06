import * as Sentry from "@sentry/react";
import { Outlet } from "react-router-dom";

import Error from "@/pages/Error";
import Loader from "@/components/Loader";

import { usePrepareHook } from "./helpers";

const AuthListener = () => {
  const { initialLoading } = usePrepareHook();

  if (initialLoading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default Sentry.withErrorBoundary(AuthListener, {
  fallback: ({ error, resetError }) => (
    <Error error={error} resetError={resetError} />
  ),
});
