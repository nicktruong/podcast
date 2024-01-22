import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  selectSeriesDetail,
  getSeriesDetailAction,
  selectLoadingSeriesDetail,
} from "@/store/details";
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

  const { cx, classes } = useStyles();

  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

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

  const handleDownloadAndPlayAudio = ({
    episodeId,
    pathToFile,
  }: {
    episodeId: string;
    pathToFile: string;
  }) => {
    if (!downloadedAudio) {
      dispatch(
        downloadAndPlayAudio({
          episodeId,
          pathToFile,
        })
      );
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
    cx,
    classes,
    openModal,
    seriesDetail,
    loadingDetail,
    audioIsPlaying,
    playingEpisodeId,
    handleOpenModal,
    handleCloseModal,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  };
};

export default usePrepare;
