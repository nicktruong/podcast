import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import type { UIState } from "./interfaces";

const initialState: UIState = {
  isSidebarExpand: true,
  isAudioPlayerOpen: false,
};

export const uiSlice = createSlice({
  name: "sidebar",
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

export const selectUIState = (state: RootState) => state.ui;

export default uiSlice.reducer;
