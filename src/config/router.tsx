import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { routes } from "@/common/constants";
import { AuthListener } from "@/containers";

const PreventLoggedInAccessGuard = lazy(
  () => import("@/guards/PreventLoggedInAccessGuard/PreventLoggedInAccessGuard")
);
const PreventListenerAccessGuard = lazy(
  () => import("@/guards/PreventListenerAccessGuard/PreventListenerAccessGuard")
);
const EnsureInterestCategoriesSelectedGuard = lazy(
  () => import("@/guards/EnsureInterestCategoriesSelectedGuard")
);

const PodcastDetailsLayout = lazy(
  () => import("@/layouts/PodcastDetailsLayout")
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
const Episode = lazy(() => import("@/pages/Episode"));
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
                element: <PodcastDetailsLayout />,
                children: [
                  {
                    path: routes.playlist,
                    element: <Playlist />,
                  },
                  {
                    path: routes.episode,
                    element: <Episode />,
                  },
                ],
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
