import { configureStore } from "@reduxjs/toolkit";

import audioReducer from "./audio";
import podReducer from "./podSlice";
import uiReducer from "./ui/uiSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import podSeriesReducer from "./podSeriesSlice";
import userPodcastSeriesReducer from "./userPodcastSeriesSlice";

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
