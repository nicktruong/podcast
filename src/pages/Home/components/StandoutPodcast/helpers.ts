import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material";

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

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const containerEl = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();

  const [breakpoint, setBreakpoint] = useState<number>(Infinity);

  const { classes, cx } = useStyles({ breakpoint });

  const userId = useAppSelector(selectUserId);

  const {
    playing: audioIsPlaying,
    episodeId: playingEpisodeId,
    downloaded: downloadedAudio,
  } = useAppSelector(selectAudioState);

  const categories = useAppSelector(selectCategories);
  const standoutPodcast = useAppSelector(selectStandOutPodcast);
  const isLoadingStandoutPodcast = useAppSelector(selectLoadingStandoutPodcast);
  const standoutCategory =
    categories.find(
      (category) => category.name === standoutPodcast?.category
    ) ?? categories[0];

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
      const current = containerEl.current;

      if (!current) return;

      if (current.offsetWidth < sm) {
        setBreakpoint(sm - 1);
      } else if (current.offsetWidth <= md) {
        setBreakpoint(md - 1);
      } else {
        setBreakpoint(md + 1);
      }
    };

    window.addEventListener("resize", init);

    init();

    return () => window.removeEventListener("resize", init);
  }, []);

  return {
    theme,
    classes,
    containerEl,
    audioIsPlaying,
    standoutPodcast,
    playingEpisodeId,
    standoutCategory,
    isLoadingStandoutPodcast,
    cx,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  };
};
