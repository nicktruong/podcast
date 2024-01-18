import { useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";

import {
  playAudio,
  pauseAudio,
  resetAudio,
  selectAudioState,
  setDurationInSeconds,
  setPassedTimeInSeconds,
} from "@/store/audio";
import { closeAudioPlayer } from "@/store/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";

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
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progressInterval, setProgressInterval] = useState(1000);

  const reactPlayerRef = useRef<ReactPlayer | null>(null);

  const onPlayerReady = () => {
    if (reactPlayerRef.current) {
      dispatch(setDurationInSeconds(reactPlayerRef.current.getDuration()));
    }
  };

  const onProgress = () => {
    dispatch(setPassedTimeInSeconds(reactPlayerRef.current!.getCurrentTime()));
  };

  const seekToSecond = (second: number) => {
    dispatch(setPassedTimeInSeconds(second));
    reactPlayerRef.current?.seekTo(second, "seconds");
  };

  const skip15Second = () => {
    seekToSecond(passedTimeInSeconds + 15);
    dispatch(setPassedTimeInSeconds(passedTimeInSeconds + 15));
  };

  const rewind15Second = () => {
    seekToSecond(passedTimeInSeconds - 15);
    dispatch(setPassedTimeInSeconds(passedTimeInSeconds - 15));
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    // change progressInterval in order to update ReactPlayer progress
    setProgressInterval(1000 / rate);
  };

  const changeAudioVolumn = (volume: number) => {
    setVolume(volume);
  };

  const toggleMuteAudio = (event?: { isMute?: boolean }) => {
    setMute((prevMute) => event?.isMute ?? !prevMute);
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
    onProgress,
    seekToSecond,
    skip15Second,
    onPlayerReady,
    rewind15Second,
    toggleMuteAudio,
    handlePlayAudio,
    handlePauseAudio,
    changeAudioVolumn,
    changePlaybackRate,
    handleCloseAudioPlayer,
  };
};

export default usePrepare;
