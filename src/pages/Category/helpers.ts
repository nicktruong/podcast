import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  selectCategoriesSeries,
  selectIsLoadingListenerPodcasts,
  fetchPodcastsByCategorySortedAndPaged,
} from "@/store/listenerPodcasts";
import { selectCategories } from "@/store/category";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { classes } = useStyles();

  const loading = useAppSelector(
    selectIsLoadingListenerPodcasts
  ).podcastsOfCategory;

  const categories = useAppSelector(selectCategories);
  const categoriesSeries = useAppSelector(selectCategoriesSeries);

  const dispatch = useAppDispatch();

  const { name } = useParams();

  const [sortBy, setSortBy] = useState<"playCount" | "createdAt">("createdAt");

  useEffect(() => {
    dispatch(
      fetchPodcastsByCategorySortedAndPaged({
        sortBy,
        offset: 0,
        pageSize: 14,
        categories: [name ?? ""],
      })
    );
  }, [sortBy]);

  const handleSelectSortBy = (value: "playCount" | "createdAt") => {
    setSortBy(value);
  };

  return {
    sortBy,
    classes,
    loading,
    categories,
    categoriesSeries,
    handleSelectSortBy,
  };
};
