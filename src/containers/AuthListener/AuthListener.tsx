import * as Sentry from "@sentry/react";
import { Outlet } from "react-router-dom";

import Error from "@/pages/Error";
import Loader from "@/components/Loader";

import { usePrepare } from "./usePrepare";

const AuthListener = () => {
  const { initialLoading, fetchingCategories } = usePrepare();

  if (initialLoading || fetchingCategories) {
    return <Loader />;
  }

  return <Outlet />;
};

export default Sentry.withErrorBoundary(AuthListener, {
  fallback: ({ error, resetError }) => (
    <Error error={error} resetError={resetError} />
  ),
});
