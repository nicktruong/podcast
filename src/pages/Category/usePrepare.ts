import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchPodcastsByCategorySortedAndPaged,
  selectCategoriesSeries,
  selectLoadingPodcastsForListener,
} from "@/store/listenerPodcastSeries";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const loading = useAppSelector(
    selectLoadingPodcastsForListener
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
        pageSize: 7,
        categories: [name ?? ""],
      })
    );
  }, [sortBy]);

  const handleSelectSortBy = (value: "playCount" | "createdAt") => {
    setSortBy(value);
  };

  return { classes, sortBy, loading, categoriesSeries, handleSelectSortBy };
};
