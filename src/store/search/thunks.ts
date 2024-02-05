import { createAsyncThunk } from "@reduxjs/toolkit";

import { search } from "@/firebase";

export const searchAction = createAsyncThunk(
  "search/searchAction",
  async (searchText: string) => {
    const searchResult = await search(searchText);

    return searchResult;
  }
);
