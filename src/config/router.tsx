import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { routes } from "@/common/constants";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const Home = lazy(() => import("@/pages/home/Home"));
const Login = lazy(() => import("@/pages/login/Login"));
const SignUp = lazy(() => import("@/pages/signup/SignUp"));

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
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.signup,
    element: <SignUp />,
  },
]);

export default router;
