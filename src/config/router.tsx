import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { routes } from "@/common/constants";
import { AuthListener } from "@/containers";
import EnsureInterestCategoriesSelectedGuard from "@/guards/EnsureInterestCategoriesSelectedGuard";

const PreventLoggedInAccessGuard = lazy(
  () => import("@/guards/PreventLoggedInAccessGuard/PreventLoggedInAccessGuard")
);
const PreventListenerAccessGuard = lazy(
  () => import("@/guards/PreventListenerAccessGuard/PreventListenerAccessGuard")
);

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const PodDashboard = lazy(() => import("@/pages/PodcasterDashboard"));
const PodLayout = lazy(() => import("@/layouts/PodcasterDashboardLayout"));

const InterestCategoriesSelection = lazy(
  () => import("@/pages/InterestCategoriesSelection")
);
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Playlist = lazy(() => import("@/pages/Playlist"));

export const router = createBrowserRouter([
  {
    element: <AuthListener />,
    children: [
      {
        element: <EnsureInterestCategoriesSelectedGuard />,
        children: [
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
        ],
      },
      // choosing categories
      {
        path: routes.categoriesSelection,
        element: <InterestCategoriesSelection />,
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
    ],
  },
]);
