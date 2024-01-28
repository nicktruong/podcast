import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
import { requestPermission } from "@/common/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { followPodcast, selectUser, unfollowPodcast } from "@/store/user";

import { useStyles } from "./styles";

const usePrepare = () => {
  const { t } = useTranslation("Playlist");

  const { id } = useParams();

  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const { classes } = useStyles();

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

  const handleFollow = () => {
    // console.log(Notification.permission, "permission");
    if (podcastDetail) {
      if (user?.following?.includes(podcastDetail.id)) {
        dispatch(unfollowPodcast({ podcastId: podcastDetail.id }));
      } else {
        if (Notification.permission === "default") {
          requestPermission();
        }

        dispatch(followPodcast({ podcastId: podcastDetail.id }));
      }
    }
  };

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
    user,
    classes,
    openModal,
    podcastDetail,
    loadingDetail,
    episodesDetail,
    audioIsPlaying,
    playingEpisodeId,
    t,
    navigate,
    handleFollow,
    handleOpenModal,
    handleCloseModal,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  };
};

export default usePrepare;
