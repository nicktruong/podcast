import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { routes } from "@/common/constants";
import { AuthListener } from "@/containers";
// Fix for [#22](https://trello.com/c/OyT5t3ix)
import Profile from "@/pages/Profile";

// Guards
const PreventLoggedInAccessGuard = lazy(
  () => import("@/guards/AuthAccessGuard")
);

const PreventListenerAccessGuard = lazy(
  () => import("@/guards/PodcasterAccessGuard")
);

const CategoriesSelectedGuard = lazy(
  () => import("@/guards/CategoriesSelectedGuard")
);

// layouts
const RootLayout = lazy(() => import("@/layouts/Root"));
const PodLayout = lazy(() => import("@/layouts/PodcasterDashboard"));
const PodcastDetailsLayout = lazy(() => import("@/layouts/PodcastDetails"));

// pages
const InterestCategoriesSelection = lazy(
  () => import("@/pages/InterestCategoriesSelection")
);
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const NotFound = lazy(() => import("@/pages/404"));
const Search = lazy(() => import("@/pages/Search"));
const SignUp = lazy(() => import("@/pages/SignUp"));
// const Profile = lazy(() => import("@/pages/Profile")); // Lazy import will trigger rerender and create bug in UserMenu
const Episode = lazy(() => import("@/pages/Episode"));
const Category = lazy(() => import("@/pages/Category"));
const Playlist = lazy(() => import("@/pages/Playlist"));
const EditProfile = lazy(() => import("@/pages/EditProfile"));
const Notification = lazy(() => import("@/pages/Notification"));
const UserPlaylist = lazy(() => import("@/pages/UserPlaylist"));
const PodcasterDashboard = lazy(() => import("@/pages/PodcasterDashboard"));

export const router = createBrowserRouter([
  {
    element: <AuthListener />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        element: <CategoriesSelectedGuard />,
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
              {
                path: routes.notification,
                element: <Notification />,
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
