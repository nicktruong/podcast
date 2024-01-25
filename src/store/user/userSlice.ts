import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ROLES } from "@/common/enums";
import {
  auth,
  upgradeUserToPodcaster,
  editProfile,
  uploadFile,
} from "@/firebase";
import { EditProfile } from "@/common/interfaces/EditProfile";
import { resizeImage } from "@/common/utils";

import { createAppAsyncThunk } from "../createAppAsyncThunk";

import {
  SLICE_NAME,
  initialState,
  SIGN_OUT_ACTION,
  UPGRADE_TO_PODCASTER_ACTION,
} from "./constants";

import type { RootState } from "@/store";
import type { User } from "@/common/interfaces";

export const editProfileAction = createAppAsyncThunk(
  "profile/editProfile",
  async ({ avatar, bio, name }: EditProfile, thunkApi) => {
    const userId = selectUserId(thunkApi.getState());

    if (!userId) {
      return;
    }

    let src: string | undefined, path: string | undefined;

    if (avatar) {
      const image = await resizeImage(avatar, { width: 300, height: 300 });
      const { fullPath } = uploadFile("avatar", image);
      src = URL.createObjectURL(avatar);
      path = fullPath;
    }

    await editProfile({ fullPath: path, name, userId, bio });

    return { name, userId, bio, src };
  }
);

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

    builder
      .addCase(editProfileAction.fulfilled, (state, { payload }) => {
        if (!state.user || !payload) {
          return;
        }

        state.user.bio = payload.bio;
        state.user.name = payload.name;
        state.user.photoURL = payload.src ?? state.user.photoURL;
      })
      .addCase(editProfileAction.rejected, (state, { error }) => {
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
