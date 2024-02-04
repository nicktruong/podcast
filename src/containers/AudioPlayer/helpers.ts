import ReactPlayer from "react-player/lazy";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { OnProgressProps } from "react-player/base";

import {
  playAudio,
  pauseAudio,
  resetAudio,
  selectAudioState,
  setDurationInSeconds,
  setPassedTimeInSeconds,
  updateAudioPlayedCount,
} from "@/store/audio";
import { closeAudioPlayer } from "@/store/ui";
import { MIN_ENGAGE_TIME } from "@/common/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const usePrepareHook = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const {
    title,
    author,
    playing,
    coverUrl,
    audioUrl,
    downloaded,
    audioDuration,
    passedDuration,
    durationInSeconds,
    passedTimeInSeconds,
  } = useAppSelector(selectAudioState);

  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(100);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progressInterval, setProgressInterval] = useState(1000);

  const trackedTime = useRef(0);
  const startTrackedTime = useRef(0);
  const reactPlayerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    if (playing) {
      startTrackedTime.current = Date.now();
    } else {
      trackedTime.current =
        trackedTime.current + Date.now() - startTrackedTime.current;
    }

    // TODO: Check audio player logic
    const id = setInterval(() => {
      trackedTime.current =
        trackedTime.current + Date.now() - startTrackedTime.current;
      startTrackedTime.current = Date.now();
    }, 1000);

    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (reactPlayerRef.current?.getCurrentTime() !== passedTimeInSeconds) {
      reactPlayerRef.current?.seekTo(passedTimeInSeconds, "seconds");
    }
  }, [passedTimeInSeconds]);

  const onReady = () => {
    if (reactPlayerRef.current) {
      dispatch(setDurationInSeconds(reactPlayerRef.current.getDuration()));
    }
  };

  const onProgress = async (onProgress: OnProgressProps) => {
    dispatch(setPassedTimeInSeconds(onProgress.playedSeconds));

    if (trackedTime.current / 1000 > MIN_ENGAGE_TIME) {
      await dispatch(updateAudioPlayedCount());
    }
  };

  const seekToSecond = (second: number) => {
    dispatch(setPassedTimeInSeconds(second));
    reactPlayerRef.current?.seekTo(second, "seconds");
  };

  const skip15Second = () => {
    let newPassedTime = passedTimeInSeconds + 15;
    newPassedTime =
      newPassedTime > durationInSeconds ? durationInSeconds : newPassedTime;

    seekToSecond(newPassedTime);
  };

  const rewind15Second = () => {
    let newPassedTime = passedTimeInSeconds - 15;
    newPassedTime = newPassedTime < 0 ? 0 : newPassedTime;

    seekToSecond(newPassedTime);
  };

  const handleChangePlaybackRate = (event: SelectChangeEvent<number>) => {
    const rate = +event.target.value;
    setPlaybackRate(rate);
    // change progressInterval in order to update ReactPlayer progress
    // E.g. if playback rate is 2x then progress interval will keep react player in sync with real time
    setProgressInterval(1000 / rate);
  };

  const changeAudioVolumn = (volume: number) => {
    setVolume(volume);
  };

  const muteAudio = () => {
    setMute(true);
  };

  const unmuteAudio = () => {
    setMute(false);
  };

  const handlePlayAudio = () => {
    dispatch(playAudio());
  };

  const handlePauseAudio = () => {
    dispatch(pauseAudio());
  };

  const handleCloseAudioPlayer = () => {
    dispatch(resetAudio());
    dispatch(closeAudioPlayer());
  };

  return {
    mute,
    title,
    volume,
    author,
    classes,
    playing,
    coverUrl,
    audioUrl,
    downloaded,
    playbackRate,
    audioDuration,
    reactPlayerRef,
    passedDuration,
    progressInterval,
    durationInSeconds,
    passedTimeInSeconds,
    onReady,
    muteAudio,
    onProgress,
    unmuteAudio,
    seekToSecond,
    skip15Second,
    rewind15Second,
    handlePlayAudio,
    handlePauseAudio,
    changeAudioVolumn,
    handleCloseAudioPlayer,
    handleChangePlaybackRate,
  };
};

export default usePrepareHook;
