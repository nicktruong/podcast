import { createSlice } from "@reduxjs/toolkit";

import type { UIState } from "./interfaces";

const initialState: UIState = {
  isSidebarExpand: true,
  isAudioPlayerOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleExpand: (state) => {
      state.isSidebarExpand = !state.isSidebarExpand;
    },
    closeAudioPlayer: (state) => {
      state.isAudioPlayerOpen = false;
    },
    openAudioPlayer: (state) => {
      state.isAudioPlayerOpen = true;
    },
  },
});

export const { toggleExpand, closeAudioPlayer, openAudioPlayer } =
  uiSlice.actions;

export default uiSlice.reducer;
