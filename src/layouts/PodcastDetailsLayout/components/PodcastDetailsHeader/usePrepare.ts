import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { selectUser } from "@/store/user";
import { selectPlaylistDetail } from "@/store/playlists";
import { selectEpisodeDetail, selectSeriesDetail } from "@/store/details";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const { id } = useParams();

  const location = useLocation();

  const isUserPlaylist = location.pathname.includes("user-playlist");

  const isPlaylist = location.pathname.includes("playlist");

  const user = useAppSelector(selectUser);

  const seriesDetail = useAppSelector(selectSeriesDetail);

  const episodeDetail = useAppSelector((state) => selectEpisodeDetail(state));

  const userPlaylistDetail = useAppSelector((state) =>
    selectPlaylistDetail(state, id ?? "")
  );

  const [titleFontSize, setTitleFontSize] = useState("97px");

  const seriesTitleRef = useRef<HTMLSpanElement>(null);
  const seriesTitleContainerRef = useRef<HTMLDivElement>(null);

  let title: string | undefined;
  let coverUrl: string | undefined;
  let authorName: string | undefined;

  if (isUserPlaylist && userPlaylistDetail) {
    title = userPlaylistDetail.title;
    coverUrl = userPlaylistDetail.coverUrl;
    authorName = user.name;
  } else {
    if (isPlaylist) {
      title = seriesDetail.title;
    } else {
      title = episodeDetail?.title;
    }

    coverUrl = seriesDetail.coverUrl;
    authorName = seriesDetail.author?.name;
  }

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
    titleFontSize,
    seriesTitleRef,
    seriesTitleContainerRef,
  };
};