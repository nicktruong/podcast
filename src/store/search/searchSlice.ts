import { createSlice } from "@reduxjs/toolkit";

import { searchAction } from "./thunks";
import { setSearchText } from "./actions";

import type { SearchState } from "./interfaces";

const initialState: SearchState = {
  searchResult: {
    podcasts: [],
    podcasters: [],
  },
  searchText: "",
  loadingSearchResult: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    startSearch: (state) => {
      state.loadingSearchResult = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(setSearchText, (state, { payload }) => {
      state.searchText = payload;
    });

    builder
      .addCase(searchAction.fulfilled, (state, { payload }) => {
        state.searchResult = payload;
        state.loadingSearchResult = false;
      })
      .addCase(searchAction.rejected, (state, { error }) => {
        console.error(error);
        state.loadingSearchResult = false;
      });
  },
});

export const { startSearch } = searchSlice.actions;

export default searchSlice.reducer;
