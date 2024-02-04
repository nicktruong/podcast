import {
  selectSearchText,
  selectSearchResult,
  selectLoadingSearchResult,
} from "@/store/search";
import { useAppSelector } from "@/hooks";
import { selectCategories } from "@/store/category";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { classes } = useStyles();

  const categories = useAppSelector(selectCategories);
  const searchText = useAppSelector(selectSearchText);
  const searchResult = useAppSelector(selectSearchResult);
  const loadingSearchResult = useAppSelector(selectLoadingSearchResult);

  return { classes, categories, searchText, searchResult, loadingSearchResult };
};
