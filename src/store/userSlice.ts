import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { auth } from "@/firebase/init";
import { Roles } from "@/common/constants/roles";
import { getUserInfo } from "@/firebase/getUserInfo";
import { Genders } from "@/common/constants/genders";
import { AsyncThunkConfig } from "@/hooks/storeHooks";
import { upgradeUserToPodcaster } from "@/firebase/upgradeUserToPodcaster";
import { UserFirebase, UserInfo } from "@/common/interfaces/user.interface";

import { RootState } from "./store";

export interface UserState {
  user: UserInfo;
  initialLoading: boolean;
}

const initialState: UserState = {
  user: {
    id: "",
    uid: "",
    dob: "",
    name: "",
    email: "",
    photoURL: "",
    displayName: "",
    emailVerified: false,
    gender: Genders.FEMALE,
    roles: [Roles.LISTENER],
    categoriesOfInterest: [],
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
    window.location.reload();

    return false;
  }

  const result = await upgradeUserToPodcaster(user.uid, user.roles);

  return result;
});

export const signOut = createAsyncThunk("user/signOut", async () => {
  await auth.signOut();
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
    builder
      .addCase(getUserInfoAction.fulfilled, (state, { payload }) => {
        if (state.user && payload) {
          state.user = {
            ...state.user,
            ...payload,
          };
        }

        state.initialLoading = false;
      })
      .addCase(getUserInfoAction.rejected, (state, { error }) => {
        state.initialLoading = false;

        console.error(error);
      });

    builder.addCase(upgradeToPodcaster.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user.roles.push(Roles.PODCASTER);
      }
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.user = initialState.user;
    });
  },
});

export const { setLoading, setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user.uid;
export const selectInitialUserDataLoading = (state: RootState) =>
  state.user.initialLoading;
export const selectUserCategoriesOfInterest = (state: RootState) =>
  state.user.user.categoriesOfInterest;

export default userSlice.reducer;
