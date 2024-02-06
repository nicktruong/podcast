import { createSlice } from "@reduxjs/toolkit";

import { getCategories } from "./thunks";

import type { CategoryState } from "./interfaces";

export const initialState: CategoryState = {
  categories: [],
  fetchingCategories: true,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state) => {
        state.fetchingCategories = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload ?? [];
        state.fetchingCategories = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.fetchingCategories = false;
      });
  },
});

export default categorySlice.reducer;
