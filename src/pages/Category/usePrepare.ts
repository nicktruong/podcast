import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchPodcastsByCategorySortedAndPaged,
  selectCategoriesSeries,
  selectIsLoadingListenerPodcasts,
} from "@/store/listenerPodcasts";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const loading = useAppSelector(
    selectIsLoadingListenerPodcasts
  ).podcastsOfCategory;

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

  return { classes, sortBy, loading, categoriesSeries, handleSelectSortBy };
};
