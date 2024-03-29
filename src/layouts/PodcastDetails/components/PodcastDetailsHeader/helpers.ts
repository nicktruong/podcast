import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { selectLoadingDetail, selectHeaderDetail } from "@/store/details";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { id } = useParams();
  const location = useLocation();
  const { classes } = useStyles();
  const { t } = useTranslation("layouts/PodcastDetails");

  const loadingDetail = useAppSelector(selectLoadingDetail);

  const { authorName, coverUrl, title } = useAppSelector((state) =>
    selectHeaderDetail(state, { id, path: location.pathname })
  );
  const [titleFontSize, setTitleFontSize] = useState("96px");
  const seriesTitleRef = useRef<HTMLSpanElement>(null);
  const seriesTitleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // resize the podcast title to fit (not overflow) the parent element

    const resizeToFit = () => {
      if (!seriesTitleRef.current || !seriesTitleContainerRef.current) {
        return;
      }

      if (
        seriesTitleRef.current.clientHeight <
        seriesTitleContainerRef.current.clientHeight
      ) {
        return;
      }

      const fontSize = window.getComputedStyle(seriesTitleRef.current).fontSize;

      const reducedFontSize = parseFloat(fontSize) - 1 + "px";
      // line below is needed to calculate immediate clientHeight
      seriesTitleRef.current.style.fontSize = reducedFontSize;
      setTitleFontSize(reducedFontSize);

      resizeToFit();
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
