import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

const initialState = {
  expand: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleExpand: (state) => {
      state.expand = !state.expand;
    },
  },
});

export const { toggleExpand } = sidebarSlice.actions;

export const selectSidebarExpandState = (root: RootState) =>
  root.sidebar.expand;

export default sidebarSlice.reducer;
