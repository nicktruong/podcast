import { configureStore } from "@reduxjs/toolkit";

import podReducer from "./podSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import podSeriesReducer from "./podSeriesSlice";

export const store = configureStore({
  reducer: {
    pod: podReducer,
    user: userReducer,
    category: categoryReducer,
    podSeries: podSeriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
