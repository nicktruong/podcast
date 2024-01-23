import { useAppSelector } from "@/hooks";
import { selectCategories } from "@/store/category";
import { selectSearchResult, selectSearchText } from "@/store/search";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const categories = useAppSelector(selectCategories);
  const searchText = useAppSelector(selectSearchText);
  const searchResult = useAppSelector(selectSearchResult);

  return { classes, categories, searchText, searchResult };
};
