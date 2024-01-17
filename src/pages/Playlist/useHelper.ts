import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  getSeriesDetailAction,
  selectLoadingSeriesDetail,
  selectSeriesDetail,
} from "@/store/userPodcastSeriesSlice";

import { useStyles } from "./styles";

const useHelper = () => {
  const dispatch = useAppDispatch();
  const { cx, classes } = useStyles();
  const { id } = useParams();
  const seriesTitleRef = useRef<HTMLSpanElement>(null);
  const seriesTitleContainerRef = useRef<HTMLDivElement>(null);
  const [titleFontSize, setTitleFontSize] = useState("97px");

  const seriesDetail = useAppSelector(selectSeriesDetail);
  const loadingDetail = useAppSelector(selectLoadingSeriesDetail);

  useEffect(() => {
    if (id) {
      dispatch(getSeriesDetailAction({ seriesId: id }));
    }
  }, [id]);

  useEffect(() => {
    const resizeToFit = () => {
      if (seriesTitleRef.current && seriesTitleContainerRef.current) {
        const fontSize = window.getComputedStyle(
          seriesTitleRef.current
        ).fontSize;

        const reducedFontSize = parseFloat(fontSize) - 1 + "px";
        seriesTitleRef.current.style.fontSize = reducedFontSize;
        setTitleFontSize(reducedFontSize);

        if (
          seriesTitleRef.current.clientHeight >=
          seriesTitleContainerRef.current.clientHeight
        ) {
          resizeToFit();
        }
      }
    };

    resizeToFit();
  }, [seriesTitleRef.current, seriesTitleContainerRef.current]);

  return {
    cx,
    titleFontSize,
    seriesTitleRef,
    seriesTitleContainerRef,
    classes,
    seriesDetail,
    loadingDetail,
  };
};

export default useHelper;
