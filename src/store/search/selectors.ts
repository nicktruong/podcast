import type { RootState } from "@/store";

export const selectSearchResult = (state: RootState) =>
  state.search.searchResult;

export const selectSearchText = (state: RootState) => state.search.searchText;
