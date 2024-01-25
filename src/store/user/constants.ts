import type { UserState } from "./interfaces";

export const initialState: UserState = {
  user: null,
  isGettingUser: true,
};

export const SLICE_NAME = "user";

export const SIGN_OUT_ACTION = `${SLICE_NAME}/signOut`;

export const UPGRADE_TO_PODCASTER_ACTION = `${SLICE_NAME}/upgradeToPodcaster`;
