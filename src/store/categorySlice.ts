import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Category } from "@/common/interfaces/Category";
import { getCategories } from "@/firebase/getCategories";

import { RootState } from "./store";

export interface CategoryState {
  loading: boolean;
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const categories = await getCategories();

    return categories;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    });

    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectLoading = (state: RootState) => state.category.loading;

export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer;
