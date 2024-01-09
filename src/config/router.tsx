import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import routes from "@/common/constants/routes";
import PreventLoggedInAccessGuard from "@/guards/PreventLoggedInAccessGuard";

const Home = lazy(() => import("@/pages/home/Home"));
const Login = lazy(() => import("@/pages/login/Login"));
const SignUp = lazy(() => import("@/pages/signup/SignUp"));
const RootLayout = lazy(() => import("@/layouts/RootLayout"));

const router = createBrowserRouter([
  {
    path: routes.index,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    element: <PreventLoggedInAccessGuard />,
    children: [
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.signup,
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
