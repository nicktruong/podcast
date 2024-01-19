import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui";
import userReducer from "./user";
import audioReducer from "./audio";
import podReducer from "./podcast";
import categoryReducer from "./category";
import podSeriesReducer from "./podcastSeries";
import userPodcastSeriesReducer from "./listenerPodcastSeries";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    pod: podReducer,
    user: userReducer,
    audio: audioReducer,
    category: categoryReducer,
    podSeries: podSeriesReducer,
    userPodcasts: userPodcastSeriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
