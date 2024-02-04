import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import {
  playAudio,
  pauseAudio,
  setAudioInfo,
  selectAudioState,
  downloadAndPlayAudio,
  setPassedTimeInSeconds,
} from "@/store/audio";
import {
  selectStandOutPodcast,
  selectLoadingStandoutPodcast,
} from "@/store/listenerPodcasts";
import { selectUserId } from "@/store/user";
import { openAudioPlayer } from "@/store/ui";
import { addHistoryAction } from "@/store/history";
import { selectCategories } from "@/store/category";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { DownloadAndPlayAudioParameters } from "@/store/audio/interfaces";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("pages/Home");

  const [breakpoint, setBreakpoint] = useState<number>(Infinity);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  const { classes, cx } = useStyles({ breakpoint });

  const userId = useAppSelector(selectUserId);
  const categories = useAppSelector(selectCategories);
  const standoutPodcast = useAppSelector(selectStandOutPodcast);
  const isLoadingStandoutPodcast = useAppSelector(selectLoadingStandoutPodcast);
  const {
    playing: audioIsPlaying,
    episodeId: playingEpisodeId,
    downloaded: downloadedAudio,
  } = useAppSelector(selectAudioState);
  const standoutCategory = categories.find(
    (category) => category.name === standoutPodcast?.category
  );

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

    if (!userId) return;
    dispatch(addHistoryAction({ podcastId: data.podcastId, userId }));
  };

  const handlePauseAudio = () => {
    dispatch(pauseAudio());
  };

  useEffect(() => {
    const init = () => {
      const { sm, md } = theme.breakpoints.values;

      if (!containerEl) return;

      if (containerEl.offsetWidth < sm) {
        setBreakpoint(sm - 1);
      } else if (containerEl.offsetWidth <= md) {
        setBreakpoint(md - 1);
      } else {
        setBreakpoint(md + 1);
      }
    };

    window.addEventListener("resize", init);

    init();

    return () => window.removeEventListener("resize", init);
  }, [containerEl]);

  return {
    theme,
    classes,
    containerEl,
    audioIsPlaying,
    standoutPodcast,
    playingEpisodeId,
    standoutCategory,
    isLoadingStandoutPodcast,
    t,
    cx,
    setContainerEl,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  };
};
