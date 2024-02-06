import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Roles } from "@/enums";

import {
  signOut,
  editProfile,
  followPodcast,
  unfollowPodcast,
  upgradeToPodcaster,
} from "./thunks";

import type { UserState } from "./interfaces";
import type { User } from "@/common/interfaces";

const initialState: UserState = {
  user: null,
  isLoadingUser: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUser = action.payload;
    },
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(upgradeToPodcaster.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user!.roles!.push(Roles.PODCASTER);
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
      .addCase(editProfile.fulfilled, (state, { payload }) => {
        if (!state.user || !payload) {
          return;
        }

        state.user.bio = payload.bio;
        state.user.name = payload.name;
        state.user.photoURL = payload.src ?? state.user.photoURL;
      })
      .addCase(editProfile.rejected, (state, { error }) => {
        console.error(error);
      });

    builder
      .addCase(followPodcast.fulfilled, (state, { payload }) => {
        if (!state.user || !payload) {
          return;
        }

        state.user.following = [
          ...(state.user.following ?? []),
          payload.podcastId,
        ];
      })
      .addCase(followPodcast.rejected, (state, { error }) => {
        console.error(error);
      });

    builder
      .addCase(unfollowPodcast.fulfilled, (state, { payload }) => {
        if (!state.user || !payload) {
          return;
        }

        state.user.following = state.user.following?.filter(
          (podcastId) => podcastId !== payload.podcastId
        );
      })
      .addCase(unfollowPodcast.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
