import ReactPlayer from "react-player/lazy";
import CloseIcon from "@mui/icons-material/Close";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { TbRewindBackward15, TbRewindForward15 } from "react-icons/tb";
import { Box, MenuItem, Select, Slider, Typography } from "@mui/material";

import { padZero } from "@/common/utils";

import usePrepare from "./usePrepare";
import { playbackRates } from "./constants";

// TODO: handle download and play on multiple audios
export default function AudioPlayer() {
  const {
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
  } = usePrepare();

  return (
    <Box className={classes.audioPlayerRoot}>
      <Box className={classes.infoContainer}>
        {downloaded && (
          <img
            alt={`${title} cover photo`}
            src={coverUrl}
            className={classes.audioPlayerImage}
          />
        )}
        <Box className={classes.infoGroup}>
          <Typography className={classes.infoTitle}>{title}</Typography>
          <Typography className={classes.infoAuthor}>{author}</Typography>
        </Box>
      </Box>

      <Box className={classes.mediaPlayer}>
        <ReactPlayer
          url={audioUrl}
          playing={playing}
          onReady={onPlayerReady}
          onProgress={onProgress}
          style={{ display: "none" }}
          playbackRate={playbackRate}
          volume={mute ? 0 : volume / 100}
          progressInterval={progressInterval}
          ref={(player) => {
            reactPlayerRef.current = player;
          }}
        />

        <Box className={classes.actions}>
          <Select
            value={playbackRate}
            className={classes.playbackRateSelect}
            onChange={(event) => changePlaybackRate(+event.target.value)}
          >
            {playbackRates.map((rate) => (
              <MenuItem value={rate} key={rate}>
                <span className={classes.speed}>{rate}</span>
                <CloseIcon className={classes.speedIcon} />
              </MenuItem>
            ))}
          </Select>

          <TbRewindBackward15
            onClick={rewind15Second}
            className={classes.timeskip}
          />

          <SkipPreviousIcon className={classes.disabled} />

          {playing ? (
            <PauseCircleIcon
              onClick={handlePauseAudio}
              className={classes.playIcon}
            />
          ) : (
            <PlayCircleIcon
              onClick={handlePlayAudio}
              className={classes.playIcon}
            />
          )}

          <SkipNextIcon className={classes.disabled} />

          <TbRewindForward15
            onClick={skip15Second}
            className={classes.timeskip}
          />
        </Box>

        <Box className={classes.sliderContainer}>
          <Typography className={classes.passedDuration}>
            {padZero(passedDuration.minutes)} :{" "}
            {padZero(passedDuration.seconds)}
          </Typography>
          <Slider
            min={0}
            size="small"
            defaultValue={0}
            max={durationInSeconds}
            className={classes.slider}
            value={passedTimeInSeconds}
            onChange={(_, value) => {
              seekToSecond(value as number);
            }}
          />
          <Typography className={classes.audioDuration}>
            {padZero(audioDuration.minutes)} : {padZero(audioDuration.seconds)}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.extras}>
        {volume === 0 || mute ? (
          <VolumeMuteIcon
            className={classes.volumeIcon}
            onClick={() => toggleMuteAudio()}
          />
        ) : (
          <VolumeUpIcon
            className={classes.volumeIcon}
            onClick={() => toggleMuteAudio()}
          />
        )}

        <Slider
          min={0}
          max={100}
          defaultValue={0}
          value={mute ? 0 : volume}
          className={classes.volumeSlider}
          onChange={(_, volume) => {
            toggleMuteAudio({ isMute: false });
            changeAudioVolumn(volume as number);
          }}
        />
      </Box>

      <CloseIcon
        className={classes.closeIcon}
        onClick={handleCloseAudioPlayer}
      />
    </Box>
  );
}
