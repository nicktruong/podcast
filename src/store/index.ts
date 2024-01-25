import { configureStore } from "@reduxjs/toolkit";

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
import userPodcastSeriesReducer from "./listenerPodcastSeries";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    pod: episodeReducer,
    user: userReducer,
    audio: audioReducer,
    search: searchReducer,
    profile: profileReducer,
    details: detailsReducer,
    category: categoryReducer,
    playlists: playlistsReducer,
    podSeries: podcastReducer,
    userPodcasts: userPodcastSeriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
