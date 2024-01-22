import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useAppSelector } from "@/hooks";
import { selectEpisodeDetail, selectSeriesDetail } from "@/store/details";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const location = useLocation();

  const isPlaylist = location.pathname.includes("playlist");

  const seriesDetail = useAppSelector(selectSeriesDetail);

  const episodeDetail = useAppSelector((state) => selectEpisodeDetail(state));

  const [titleFontSize, setTitleFontSize] = useState("97px");

  const seriesTitleRef = useRef<HTMLSpanElement>(null);
  const seriesTitleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // resize the podcast title to fit (not overflow) the parent element
    const resizeToFit = () => {
      if (!seriesTitleRef.current || !seriesTitleContainerRef.current) {
        return;
      }

      const fontSize = window.getComputedStyle(seriesTitleRef.current).fontSize;

      const reducedFontSize = parseFloat(fontSize) - 1 + "px";
      // line below is needed to calculate immediate clientHeight
      seriesTitleRef.current.style.fontSize = reducedFontSize;
      setTitleFontSize(reducedFontSize);

      if (
        seriesTitleRef.current.clientHeight >=
        seriesTitleContainerRef.current.clientHeight
      ) {
        resizeToFit();

        return;
      }
    };

    resizeToFit();
  }, [seriesDetail.title]);

  return {
    classes,
    isPlaylist,
    seriesDetail,
    episodeDetail,
    titleFontSize,
    seriesTitleRef,
    seriesTitleContainerRef,
  };
};
