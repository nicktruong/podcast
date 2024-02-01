import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Box, Typography, Button, alpha } from "@mui/material";

import { capFirstChar, isDark } from "@/common/utils";
import { routes } from "@/common/constants";

import StandoutPodcastSkeleton from "../StandoutPodcastSkeleton";

import { usePrepare } from "./helpers";

const StandoutPodcast = () => {
  const {
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
  } = usePrepare();

  if (isLoadingStandoutPodcast) {
    return <StandoutPodcastSkeleton />;
  }

  return (
    <Box ref={containerEl}>
      <Typography className={classes.standoutPodcastHeading}>
        Standout podcast
      </Typography>
      <Box
        className={cx(classes.standoutPodcastContainer, {
          // [classes.flexWrap]:
          //   !!containerWidth && containerWidth < theme.breakpoints.values.md,
        })}
      >
        <Box className={classes.standoutPodcast}>
          <img
            src={standoutPodcast?.coverUrl}
            className={classes.standoutPodcastImg}
            alt={`${standoutPodcast?.title} cover photo`}
          />
          <Button
            component={Link}
            className={classes.categoryBtn}
            to={routes.category.replace(":name", standoutCategory.name)}
            sx={(theme) => ({
              color: isDark(standoutCategory.color)
                ? theme.palette.common.white
                : theme.palette.common.black,
              borderColor: alpha(standoutCategory.color, 0),
              backgroundColor: alpha(standoutCategory.color, 0.6),

              "&:hover": {
                borderColor: alpha(standoutCategory.color, 0),
                backgroundColor: alpha(standoutCategory.color, 0.8),
              },
            })}
          >
            {standoutPodcast?.category}
          </Button>
          <Link
            className={classes.standoutPodcastTitle}
            to={routes.playlist.replace(":id", standoutPodcast?.id ?? "")}
          >
            {standoutPodcast?.title}
          </Link>
          <Typography className={classes.standoutPodcastDesc}>
            {standoutPodcast?.description}
          </Typography>
        </Box>

        <Box className={classes.episodesContainer}>
          <Box className={classes.episodes}>
            {standoutPodcast?.episodes.map((episode) => {
              const episodeCreatedAt = capFirstChar(
                formatDistance(new Date(episode.createdAt), new Date(), {
                  addSuffix: true,
                })
              );

              return (
                <Box className={classes.episode} key={episode.id}>
                  {/* TODO: Add episode cover photo */}
                  <img
                    alt=""
                    src={episode.pathToImgFile}
                    className={classes.episodeCover}
                  />

                  <Box className={classes.episodeInfo}>
                    <Typography className={classes.episodeCreatedAt}>
                      {episodeCreatedAt}
                    </Typography>
                    <Link
                      className={classes.episodeTitle}
                      to={routes.episode.replace(":id", episode.id)}
                    >
                      #{episode.no}: {episode.title}
                    </Link>
                    <Typography className={classes.episodeDesc}>
                      {episode.description}
                    </Typography>

                    <Box
                      className={classes.playIconBtn}
                      component="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (
                          playingEpisodeId === episode?.id &&
                          audioIsPlaying
                        ) {
                          handlePauseAudio();
                        } else {
                          handleDownloadAndPlayAudio({
                            title: episode.title,
                            episodeId: episode.id,
                            pathToFile: episode.pathToFile,
                            podcastId: standoutPodcast.id,
                            coverUrl: standoutPodcast.coverUrl,
                            author: standoutPodcast.author.name,
                          });
                        }
                      }}
                    >
                      {audioIsPlaying && playingEpisodeId === episode?.id ? (
                        <PauseCircleIcon className={classes.playIcon} />
                      ) : (
                        <PlayCircleIcon className={classes.playIcon} />
                      )}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StandoutPodcast;
