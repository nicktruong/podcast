import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import routes from "@/common/constants/routes";

const PreventLoggedInAccessGuard = lazy(
  () => import("@/guards/PreventLoggedInAccessGuard")
);
const PreventListenerAccessGuard = lazy(
  () => import("@/guards/PreventListenerAccessGuard")
);

const Home = lazy(() => import("@/pages/home/Home"));
const Playlist = lazy(() => import("@/pages/Playlist"));
const Login = lazy(() => import("@/pages/login/Login"));
const SignUp = lazy(() => import("@/pages/signup/SignUp"));
const PodLayout = lazy(() => import("@/layouts/PodLayout"));
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const PodDashboard = lazy(() => import("@/pages/pod-dashboard/PodDashboard"));

const router = createBrowserRouter([
  {
    path: routes.index,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.playlist,
        element: <Playlist />,
      },
    ],
  },

  // Auth
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

  // Podcaster
  {
    path: routes.pod,
    element: <PodLayout />,
    children: [
      {
        element: <PreventListenerAccessGuard />,
        children: [
          {
            path: routes.podDashboard,
            element: <PodDashboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
