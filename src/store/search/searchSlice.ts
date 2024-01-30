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
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setSearchText, (state, { payload }) => {
      state.searchText = payload;
    });

    builder
      .addCase(searchAction.fulfilled, (state, { payload }) => {
        state.searchResult = payload;
      })
      .addCase(searchAction.rejected, (state, { error }) => {
        console.error(error);
      });
  },
});

export default searchSlice.reducer;
