import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { search } from "@/firebase";

import { RootState } from "..";

import { SearchState } from "./interfaces";

const initialState: SearchState = {
  searchResult: {
    series: [],
    podcasters: [],
  },
  searchText: "",
};

export const searchAction = createAsyncThunk(
  "search/searchAction",
  async (searchText: string) => {
    const searchResult = await search(searchText);

    return { searchResult, searchText };
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchAction.fulfilled, (state, { payload }) => {
        state.searchText = payload.searchText;
        state.searchResult = payload.searchResult;
      })
      .addCase(searchAction.rejected, (_, { error }) => {
        console.error(error);
      });
  },
});

export const selectSearchResult = (state: RootState) =>
  state.search.searchResult;

export const selectSearchText = (state: RootState) => state.search.searchText;

export default searchSlice.reducer;
