import type { RootState } from "@/store";

export const selectFetchingCategories = (state: RootState) =>
  state.category.fetchingCategories;

export const selectCategories = (state: RootState) => state.category.categories;
