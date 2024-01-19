import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  selectSeriesDetail,
  getSeriesDetailAction,
  selectLoadingSeriesDetail,
} from "@/store/listenerPodcastSeries";
import {
  playAudio,
  pauseAudio,
  selectAudioState,
  downloadAndPlayAudio,
} from "@/store/audio";
import { openAudioPlayer } from "@/store/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const usePrepare = () => {
  const { id } = useParams();

  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [titleFontSize, setTitleFontSize] = useState("97px");

  const seriesTitleRef = useRef<HTMLSpanElement>(null);
  const seriesTitleContainerRef = useRef<HTMLDivElement>(null);

  const {
    playing: audioIsPlaying,
    downloaded: downloadedAudio,
    episodeId: playingEpisodeId,
  } = useAppSelector(selectAudioState);
  const seriesDetail = useAppSelector(selectSeriesDetail);
  const loadingDetail = useAppSelector(selectLoadingSeriesDetail);

  useEffect(() => {
    if (id) {
      dispatch(getSeriesDetailAction({ seriesId: id }));
    }
  }, [id]);

  useEffect(() => {
    // TODO: Add loading state for this!!!
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
      }
    };

    resizeToFit();
  }, [seriesTitleRef.current, seriesTitleContainerRef.current]);

  const handleDownloadAndPlayAudio = ({
    episodeId,
    pathToFile,
  }: {
    episodeId: string;
    pathToFile: string;
  }) => {
    if (!downloadedAudio) {
      dispatch(downloadAndPlayAudio({ episodeId, pathToFile }));
    } else {
      dispatch(playAudio());
    }

    dispatch(openAudioPlayer());
  };

  const handlePauseAudio = () => {
    dispatch(pauseAudio());
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return {
    classes,
    openModal,
    seriesDetail,
    loadingDetail,
    titleFontSize,
    audioIsPlaying,
    seriesTitleRef,
    playingEpisodeId,
    seriesTitleContainerRef,
    handleOpenModal,
    handleCloseModal,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  };
};

export default usePrepare;
