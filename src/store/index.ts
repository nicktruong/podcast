import { combineReducers, configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui";
import userReducer from "./user";
import audioReducer from "./audio";
import searchReducer from "./search";
import profileReducer from "./profile";
import episodeReducer from "./episode";
import podcastReducer from "./podcast";
import detailsReducer from "./details";
import categoryReducer from "./category";
import playlistsReducer from "./playlists";
import notificationReducer from "./notification";
import userPodcastSeriesReducer from "./listenerPodcasts";

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  pod: episodeReducer,
  audio: audioReducer,
  search: searchReducer,
  profile: profileReducer,
  details: detailsReducer,
  category: categoryReducer,
  podSeries: podcastReducer,
  playlists: playlistsReducer,
  notification: notificationReducer,
  userPodcasts: userPodcastSeriesReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
