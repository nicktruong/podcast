import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Roles, Genders } from "@/common/enums";
import { AsyncThunkConfig } from "@/hooks/redux";
import { auth, upgradeUserToPodcaster } from "@/firebase";

import type { RootState } from "@/store";
import type { UserState } from "./interfaces";
import type { UserInfo } from "@/common/interfaces";

const initialState: UserState = {
  user: {
    id: "",
    dob: "",
    name: "",
    email: "",
    history: [],
    photoURL: "",
    emailVerified: false,
    gender: Genders.FEMALE,
    roles: [Roles.LISTENER],
    categoriesOfInterest: [],
  },
  isGettingUser: true,
};

export const upgradeToPodcaster = createAsyncThunk<
  boolean,
  undefined,
  AsyncThunkConfig
>("user/upgradeToPodcaster", async (_, thunkApi) => {
  const { user } = thunkApi.getState().user;

  if (!user.id) {
    throw new Error("Please log in to upgrade role");
  }

  if (!user.emailVerified) {
    // TODO: add toast
    console.log("Please verify email before upgrading to podcaster");
    window.location.reload();

    return false;
  }

  const result = await upgradeUserToPodcaster(user.id, user.roles);

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
      state.isGettingUser = action.payload;
    },
    setUser: (state, action: PayloadAction<Partial<UserInfo>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
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

export const selectUserId = (state: RootState) => state.user.user.id;

export const selectUserRoles = (state: RootState) => state.user.user.roles;

export const selectInitialUserDataLoading = (state: RootState) =>
  state.user.isGettingUser;

export const selectUserCategoriesOfInterest = (state: RootState) =>
  state.user.user.categoriesOfInterest;

export default userSlice.reducer;
