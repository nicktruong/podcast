import type { RootState } from "@/store";

export const selectUIState = (state: RootState) => state.ui;

export const selectIsSidebarExpand = (state: RootState) =>
  state.ui.isSidebarExpand;

export const selectIsAudioPlayerOpen = (state: RootState) =>
  state.ui.isAudioPlayerOpen;
