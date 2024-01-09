import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { auth } from "@/firebase/init";
import routes from "@/common/constants/routes";

export default function PreventLoggedInAccessGuard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate(routes.index, { replace: true });
      } else {
        setLoading(false);
      }
    });
  });

  if (loading) {
    return <>Loading...</>;
  }

  return <Outlet />;
}
