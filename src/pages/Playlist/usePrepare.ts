import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchPodcastDetail,
  selectPodcastDetail,
  selectEpisodesDetail,
  selectLoadingPodcastDetail,
  fetchPlaylistEpisodesDetail,
} from "@/store/details";
import {
  playAudio,
  pauseAudio,
  selectAudioState,
  downloadAndPlayAudio,
  setPassedTimeInSeconds,
} from "@/store/audio";
import { openAudioPlayer } from "@/store/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const usePrepare = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { cx, classes } = useStyles();

  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

  const {
    playing: audioIsPlaying,
    downloaded: downloadedAudio,
    episodeId: playingEpisodeId,
  } = useAppSelector(selectAudioState);
  const podcastDetail = useAppSelector(selectPodcastDetail);
  const loadingDetail = useAppSelector(selectLoadingPodcastDetail);
  const episodesDetail = useAppSelector(selectEpisodesDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchPodcastDetail(id));

      if (episodesDetail.length === 0) {
        dispatch(fetchPlaylistEpisodesDetail(id));
      }
    }
  }, [id]);

  const handleDownloadAndPlayAudio = ({
    title,
    author,
    coverUrl,
    podcastId,
    episodeId,
    pathToFile,
  }: {
    title: string;
    author: string;
    coverUrl: string;
    podcastId: string;
    episodeId: string;
    pathToFile: string;
  }) => {
    if (!downloadedAudio || episodeId !== playingEpisodeId) {
      dispatch(setPassedTimeInSeconds(0));

      dispatch(
        downloadAndPlayAudio({
          title,
          author,
          coverUrl,
          podcastId,
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
    podcastDetail,
    loadingDetail,
    episodesDetail,
    audioIsPlaying,
    playingEpisodeId,
    navigate,
    handleOpenModal,
    handleCloseModal,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  };
};

export default usePrepare;
