import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { selectLoadingDetail, selectHeaderDetail } from "@/store/details";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { id } = useParams();

  const { classes } = useStyles();

  const location = useLocation();

  const { t } = useTranslation("PodcastDetails");

  const { authorName, coverUrl, title } = useAppSelector((state) =>
    selectHeaderDetail(state, { id, path: location.pathname })
  );
  const loadingDetail = useAppSelector(selectLoadingDetail);

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
  }, [title]);

  return {
    title,
    classes,
    coverUrl,
    authorName,
    loadingDetail,
    titleFontSize,
    seriesTitleRef,
    seriesTitleContainerRef,
    t,
  };
};
