import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui";
import userReducer from "./user";
import audioReducer from "./audio";
import podReducer from "./podcast";
import searchReducer from "./search";
import detailsReducer from "./details";
import categoryReducer from "./category";
import playlistsReducer from "./playlists";
import podSeriesReducer from "./podcastSeries";
import userPodcastSeriesReducer from "./listenerPodcastSeries";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    pod: podReducer,
    user: userReducer,
    audio: audioReducer,
    search: searchReducer,
    details: detailsReducer,
    category: categoryReducer,
    playlists: playlistsReducer,
    podSeries: podSeriesReducer,
    userPodcasts: userPodcastSeriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
