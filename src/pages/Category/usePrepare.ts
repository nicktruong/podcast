import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchSeriesByCategorySortedAndPaged,
  selectCategoriesSeries,
} from "@/store/listenerPodcastSeries";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const categoriesSeries = useAppSelector(selectCategoriesSeries);

  const dispatch = useAppDispatch();

  const { name } = useParams();

  const [sortBy, setSortBy] = useState<"playCount" | "createdAt">("createdAt");

  useEffect(() => {
    dispatch(
      fetchSeriesByCategorySortedAndPaged({ categories: [name ?? ""], sortBy })
    );
  }, [sortBy]);

  const handleSelectSortBy = (value: "playCount" | "createdAt") => {
    setSortBy(value);
  };

  return { classes, sortBy, categoriesSeries, handleSelectSortBy };
};
