import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/common/interfaces";
import { getUserInfo } from "@/firebase";

import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { RootState } from "..";

export interface ProfileState {
  user: User | null;
}

const initialState: ProfileState = {
  user: null,
};

export const fetchUserInfo = createAppAsyncThunk(
  "profile/fetchUserInfo",
  async (uid: string) => {
    const user = await getUserInfo(uid);

    return user;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = payload;
        }
      })
      .addCase(fetchUserInfo.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export const selectUserProfile = (state: RootState) => state.profile.user;

export default profileSlice.reducer;
