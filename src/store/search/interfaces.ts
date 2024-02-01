import type { SearchResult } from "@/common/interfaces";

export interface SearchState {
  searchText: string;
  searchResult: SearchResult;
  loadingSearchResult: boolean;
}
