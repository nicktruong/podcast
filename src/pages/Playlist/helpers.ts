import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchPodcastDetail,
  selectPodcastDetail,
  selectLoadingDetail,
  selectEpisodesDetail,
  fetchPlaylistEpisodesDetail,
} from "@/store/details";
import {
  playAudio,
  pauseAudio,
  setAudioInfo,
  selectAudioState,
  downloadAndPlayAudio,
  setPassedTimeInSeconds,
} from "@/store/audio";
import { openAudioPlayer } from "@/store/ui";
import { selectCategory } from "@/store/category";
import { addHistoryAction } from "@/store/history";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { followPodcast, selectUser, unfollowPodcast } from "@/store/user";

import { useStyles } from "./styles";

import type { DownloadAndPlayAudioParameters } from "@/store/audio/interfaces";

const usePrepareHook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("pages/Playlist");

  const [openModal, setOpenModal] = useState(false);

  const {
    playing: audioIsPlaying,
    episodeId: playingEpisodeId,
    downloaded: downloadedAudio,
  } = useAppSelector(selectAudioState);
  const user = useAppSelector(selectUser);
  const podcastDetail = useAppSelector(selectPodcastDetail);
  const loadingDetail = useAppSelector(selectLoadingDetail);
  const episodesDetail = useAppSelector(selectEpisodesDetail);
  const category = useAppSelector((state) =>
    selectCategory(state, podcastDetail?.category ?? "")
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPodcastDetail(id));
      dispatch(fetchPlaylistEpisodesDetail(id));
    }
  }, [id]);

  const handleFollow = async () => {
    if (!podcastDetail?.id || !user?.id || !user?.following) return;

    if (user.following.includes(podcastDetail.id)) {
      dispatch(
        unfollowPodcast({
          userId: user.id,
          podcastId: podcastDetail.id,
        })
      );
    } else {
      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }

      dispatch(
        followPodcast({
          userId: user.id,
          podcastId: podcastDetail.id,
        })
      );
    }
  };

  const handleDownloadAndPlayAudio = (data: DownloadAndPlayAudioParameters) => {
    const { pathToFile, ...audioInfo } = data;

    if (downloadedAudio && data.episodeId === playingEpisodeId) {
      dispatch(playAudio());

      return;
    }

    dispatch(setPassedTimeInSeconds(0));

    dispatch(setAudioInfo(audioInfo));

    dispatch(downloadAndPlayAudio(pathToFile));

    dispatch(openAudioPlayer());

    if (!user?.id || !podcastDetail?.id) return;
    dispatch(
      addHistoryAction({ podcastId: podcastDetail?.id, userId: user.id })
    );
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
    category,
    openModal,
    loadingDetail,
    podcastDetail,
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

export default usePrepareHook;
