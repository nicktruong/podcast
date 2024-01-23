import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllCategories } from "@/firebase";

import type { RootState } from "@/store";
import type { CategoryState } from "./interfaces";

const initialState: CategoryState = {
  loading: false,
  categories: { categories: [] },
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const categories = await getAllCategories();

    return categories;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectLoading = (state: RootState) => state.category.loading;

export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer;
