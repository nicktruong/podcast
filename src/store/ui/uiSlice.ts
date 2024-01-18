import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState = {
  sidebarExpand: true,
  isAudioPlayerOpen: false,
};

export const uiSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleExpand: (state) => {
      state.sidebarExpand = !state.sidebarExpand;
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
