import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Roles } from "@/common/constants/roles";
import { getUserInfo } from "@/firebase/getUserInfo";
import { Genders } from "@/common/constants/genders";
import { AsyncThunkConfig } from "@/hooks/storeHooks";
import { UserFirebase, User } from "@/common/interfaces/user.interface";
import { upgradeUserToPodcaster } from "@/firebase/upgradeUserToPodcaster";

import { RootState } from "./store";

type UserInfo = UserFirebase & User;

export interface UserState {
  user: UserInfo;
  initialLoading: boolean;
}

const initialState: UserState = {
  user: {
    uid: "",
    dob: "",
    name: "",
    email: "",
    photoURL: "",
    displayName: "",
    emailVerified: false,
    gender: Genders.female,
    roles: [Roles.listener],
  },
  initialLoading: true,
};

export const getUserInfoAction = createAsyncThunk(
  "user/getUserInfoAction",
  async (user: Partial<UserFirebase>) => {
    if (!user.uid) {
      throw new Error("Require user id to get user info");
    }

    const userInfo = await getUserInfo(user.uid);

    return {
      ...user,
      ...userInfo,
    };
  }
);

export const upgradeToPodcaster = createAsyncThunk<
  boolean,
  undefined,
  AsyncThunkConfig
>("user/upgradeToPodcaster", async (_, thunkApi) => {
  const { user } = thunkApi.getState().user;

  if (!user.uid) {
    throw new Error("Please log in to upgrade role");
  }

  if (!user.emailVerified) {
    // TODO: add toast
    console.log("Please verify email before upgrading to podcaster");

    return false;
  }

  const result = await upgradeUserToPodcaster(user.uid, user.roles);

  return result;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.initialLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<Partial<UserInfo>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfoAction.fulfilled, (state, { payload }) => {
      if (state.user && payload) {
        state.user = {
          ...state.user,
          ...payload,
        };
      }

      state.initialLoading = false;
    });

    builder.addCase(upgradeToPodcaster.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user.roles.push(Roles.podcaster);
      }
    });
  },
});

export const { setLoading, setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectInitialUserDataLoading = (state: RootState) =>
  state.user.initialLoading;

export default userSlice.reducer;
