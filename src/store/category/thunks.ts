import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchAllCategories } from "@/firebase";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const categories = await fetchAllCategories();

    return categories;
  }
);
