import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllCategories } from "@/firebase";

import { SLICE_NAME, initialState, FETCH_CATEGORIES_ACTION } from "./constants";

import type { RootState } from "@/store";

export const fetchCategories = createAsyncThunk(
  FETCH_CATEGORIES_ACTION,
  async () => {
    const categories = await getAllCategories();

    return categories;
  }
);

export const categorySlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
        state.fetchingCategories = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchingCategories = false;
      });
  },
});

export const selectFetchingCategories = (state: RootState) =>
  state.category.fetchingCategories;

export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer;
