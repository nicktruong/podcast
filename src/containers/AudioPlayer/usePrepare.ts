import ReactPlayer from "react-player/lazy";
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

const usePrepare = () => {
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
  const [trackedTime, setTrackedTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [startTrackedTime, setStartTrackedTime] = useState(0);
  const [progressInterval, setProgressInterval] = useState(1000);

  const reactPlayerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    if (playing) {
      setStartTrackedTime(Date.now());
    } else if (startTrackedTime !== 0) {
      setTrackedTime(
        (oldTrackedTime) => oldTrackedTime + Date.now() - startTrackedTime
      );
    }
  }, [playing]);

  useEffect(() => {
    if (reactPlayerRef.current?.getCurrentTime() !== passedTimeInSeconds) {
      reactPlayerRef.current?.seekTo(passedTimeInSeconds, "seconds");
    }
  }, [passedTimeInSeconds]);

  const onPlayerReady = () => {
    if (reactPlayerRef.current) {
      dispatch(setDurationInSeconds(reactPlayerRef.current.getDuration()));
    }
  };

  const onProgress = async (onProgress: OnProgressProps) => {
    dispatch(setPassedTimeInSeconds(onProgress.playedSeconds));

    if (trackedTime / 1000 > MIN_ENGAGE_TIME) {
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
    dispatch(setPassedTimeInSeconds(newPassedTime));
  };

  const rewind15Second = () => {
    let newPassedTime = passedTimeInSeconds - 15;
    newPassedTime = newPassedTime < 0 ? 0 : newPassedTime;

    seekToSecond(newPassedTime);
    dispatch(setPassedTimeInSeconds(newPassedTime));
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    // change progressInterval in order to update ReactPlayer progress
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
    muteAudio,
    onProgress,
    unmuteAudio,
    seekToSecond,
    skip15Second,
    onPlayerReady,
    rewind15Second,
    handlePlayAudio,
    handlePauseAudio,
    changeAudioVolumn,
    changePlaybackRate,
    handleCloseAudioPlayer,
  };
};

export default usePrepare;
