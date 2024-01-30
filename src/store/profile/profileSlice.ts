import { createSlice } from "@reduxjs/toolkit";

import { fetchUserInfo } from "./thunks";

import type { User } from "@/common/interfaces";

export interface ProfileState {
  user: User | null;
}

const initialState: ProfileState = {
  user: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.user = payload;
      })
      .addCase(fetchUserInfo.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export default profileSlice.reducer;
