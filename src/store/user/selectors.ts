import type { RootState } from "@/store";

export const selectUser = (state: RootState) => state.user.user;

export const selectUserId = (state: RootState) => state.user.user?.id;

export const selectUserRoles = (state: RootState) => state.user.user?.roles;

export const selectUserHistory = (state: RootState) => state.user.user?.history;

export const selectIsUserLoading = (state: RootState) =>
  state.user.isLoadingUser;

export const selectUserCategoriesOfInterest = (state: RootState) =>
  state.user.user?.categoriesOfInterest;
