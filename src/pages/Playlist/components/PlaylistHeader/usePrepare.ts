import { useEffect, useRef, useState } from "react";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

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
  }, [seriesTitleRef.current, seriesTitleContainerRef.current]);

  return {
    classes,
    titleFontSize,
    seriesTitleRef,
    seriesTitleContainerRef,
  };
};
