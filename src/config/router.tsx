import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { routes } from "@/common/constants";
import { AuthListener } from "@/containers";

// Guards
const PreventLoggedInAccessGuard = lazy(
  () => import("@/guards/PreventLoggedInAccessGuard")
);

const PreventListenerAccessGuard = lazy(
  () => import("@/guards/PreventListenerAccessGuard")
);

const EnsureInterestCategoriesSelectedGuard = lazy(
  () => import("@/guards/EnsureInterestCategoriesSelectedGuard")
);

// layouts
const PodcastDetailsLayout = lazy(
  () => import("@/layouts/PodcastDetailsLayout")
);
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const PodLayout = lazy(() => import("@/layouts/PodcasterDashboardLayout"));
const PodcasterDashboard = lazy(() => import("@/pages/PodcasterDashboard"));

// pages
const InterestCategoriesSelection = lazy(
  () => import("@/pages/InterestCategoriesSelection")
);
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/404"));
const Search = lazy(() => import("@/pages/Search"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Profile = lazy(() => import("@/pages/Profile"));
const Episode = lazy(() => import("@/pages/Episode"));
const Category = lazy(() => import("@/pages/Category"));
const Playlist = lazy(() => import("@/pages/Playlist"));
const EditProfile = lazy(() => import("@/pages/EditProfile"));
const UserPlaylist = lazy(() => import("@/pages/UserPlaylist"));

export const router = createBrowserRouter([
  {
    element: <AuthListener />,
    children: [
      {
        path: "*",
        // TODO: Add 404 page
        element: <NotFound />,
      },
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
                  {
                    path: routes.userPlaylist,
                    element: <UserPlaylist />,
                  },
                ],
              },
              {
                path: routes.search,
                element: <Search />,
              },
              {
                path: routes.category,
                element: <Category />,
              },
              {
                path: routes.profile,
                element: <Profile />,
              },
              {
                path: routes.editProfile,
                element: <EditProfile />,
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
        path: routes.podcaster,
        element: <PodLayout />,
        children: [
          {
            element: <PreventListenerAccessGuard />,
            children: [
              {
                path: routes.podcasterDashboard,
                element: <PodcasterDashboard />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
