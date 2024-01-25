import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ROLES } from "@/common/enums";
import { auth, upgradeUserToPodcaster } from "@/firebase";

import { createAppAsyncThunk } from "../createAppAsyncThunk";

import {
  SLICE_NAME,
  initialState,
  SIGN_OUT_ACTION,
  UPGRADE_TO_PODCASTER_ACTION,
} from "./constants";

import type { RootState } from "@/store";
import type { User } from "@/common/interfaces";

export const upgradeToPodcaster = createAppAsyncThunk(
  UPGRADE_TO_PODCASTER_ACTION,
  async (_, thunkApi) => {
    const user = selectUser(thunkApi.getState());

    if (!user?.id) {
      // TODO: toast
      return false;
    }

    if (!user.emailVerified) {
      // TODO: add toast
      console.log("Please verify email before upgrading to podcaster");
      // console.log("If you're already verify, please reload page");
      // window.location.reload();

      return false;
    }

    const result = await upgradeUserToPodcaster(user.id, user.roles!);

    return result;
  }
);

export const signOut = createAsyncThunk(SIGN_OUT_ACTION, async () => {
  await auth.signOut();
});

export const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isGettingUser = action.payload;
    },
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(upgradeToPodcaster.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user!.roles!.push(ROLES.PODCASTER);
        }
      })
      .addCase(upgradeToPodcaster.rejected, (state, { error }) => {
        console.error(error);
      });

    builder
      .addCase(signOut.fulfilled, (state) => {
        state.user = initialState.user;
      })
      .addCase(signOut.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export const selectUserId = (state: RootState) => state.user.user?.id;

export const selectUserRoles = (state: RootState) => state.user.user?.roles;

export const selectInitialUserDataLoading = (state: RootState) =>
  state.user.isGettingUser;

export const selectUserCategoriesOfInterest = (state: RootState) =>
  state.user.user?.categoriesOfInterest;

export default userSlice.reducer;
