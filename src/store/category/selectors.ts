import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

export const selectFetchingCategories = (state: RootState) =>
  state.category.fetchingCategories;

export const selectCategories = (state: RootState) => state.category.categories;

export const selectCategory = createSelector(
  [selectCategories, (state: RootState, category: string) => category],
  (categories, category) => categories.find(({ name }) => category === name)
);
