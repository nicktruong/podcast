import { configureStore } from "@reduxjs/toolkit";

import podReducer from "./podSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import podSeriesReducer from "./podSeriesSlice";
import userPodcastSeriesReducer from "./userPodcastSeriesSlice";
import sidebarReducer from "./sidebarSlice";

export const store = configureStore({
  reducer: {
    pod: podReducer,
    user: userReducer,
    sidebar: sidebarReducer,
    category: categoryReducer,
    podSeries: podSeriesReducer,
    userPodcasts: userPodcastSeriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
