import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import podSeriesReducer from "./podSeriesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    podSeries: podSeriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
