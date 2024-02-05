import { Box, Button, Typography, alpha } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { routes } from "@/common/constants";
import { isDark } from "@/common/utils";

import usePrepare from "./usePrepare";
import PodcastRating from "./components/PlaylistRating";
import PlaylistSkeleton from "./components/PlaylistSkeleton";

export default function Playlist() {
  const {
    user,
    classes,
    category,
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
  } = usePrepare();

  if (loadingDetail) {
    return <PlaylistSkeleton />;
  }

  return (
    <Box>
      <Box className={classes.actions}>
        <Button
          variant="outlined"
          onClick={handleFollow}
          className={classes.followBtn}
        >
          {!user?.following?.includes(podcastDetail?.id ?? "")
            ? t("follow")
            : t("unfollow")}
        </Button>
      </Box>

      <Box className={classes.playlistMain}>
        <Box className={classes.episodes}>
          <Typography className={classes.episodesHeading}>
            {t("allEpisodes")}
          </Typography>

          {episodesDetail.map((episode) => {
            return (
              <Box
                key={episode.id}
                className={classes.episode}
                onClick={() =>
                  navigate(routes.episode.replace(":id", episode.id))
                }
              >
                <Box>
                  <Typography className={classes.episodeTitle}>
                    {episode.title}
                  </Typography>
                  <Typography className={classes.podcastName}>
                    {podcastDetail?.title}
                  </Typography>
                  <Typography className={classes.episodeDescription}>
                    {episode.description}
                  </Typography>
                </Box>

                <Box className={classes.playbar}>
                  <Box className={classes.playbarMainActions}>
                    <Box
                      component="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (playingEpisodeId === episode.id && audioIsPlaying) {
                          handlePauseAudio();
                        } else {
                          handleDownloadAndPlayAudio({
                            title: episode.title,
                            episodeId: episode.id,
                            pathToFile: episode.pathToFile,
                            podcastId: podcastDetail?.id ?? "",
                            coverUrl: podcastDetail?.coverUrl ?? "",
                            author: podcastDetail?.author.name ?? "",
                          });
                        }
                      }}
                    >
                      {playingEpisodeId === episode.id && audioIsPlaying ? (
                        <PauseCircleIcon className={classes.icon} />
                      ) : (
                        <PlayCircleIcon className={classes.icon} />
                      )}
                    </Box>

                    <Box className={classes.info}>
                      <Typography className={classes.date}>
                        {t("createdAt", {
                          val: new Date(podcastDetail?.createdAt ?? Date.now()),
                          formatParams: {
                            val: {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          },
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box className={classes.about}>
          <Box>
            <Typography className={classes.aboutHeading} component="h3">
              {t("about")}
            </Typography>
            <Typography className={classes.aboutDetail}>
              {/* TODO: Change when Add profile & Bio */}
              {podcastDetail?.author.bio ?? t("noBio")}
            </Typography>
          </Box>

          <Box>
            <PodcastRating open={openModal} handleClose={handleCloseModal} />

            <Button
              variant="outlined"
              onClick={handleOpenModal}
              className={classes.ratingBtn}
            >
              {/* TODO: Change when add rating */}
              <span>{(podcastDetail?.rating ?? 0).toFixed(1)}</span>
              <StarBorderIcon className={classes.ratingBtnIcon} />
              <span className={classes.rateCount}>
                ({podcastDetail?.rateCount.toLocaleString() ?? 0})
              </span>
            </Button>
          </Box>

          {/* TODO: Change to link component when implement search */}
          {podcastDetail && category && (
            <Button
              className={classes.categoryBtn}
              onClick={() => {
                navigate(routes.category.replace(":name", category.name));
              }}
              sx={(theme) => ({
                color: isDark(category.color)
                  ? theme.palette.common.white
                  : theme.palette.common.black,
                borderColor: alpha(category.color, 0),
                backgroundColor: alpha(category.color, 0.6),

                "&:hover": {
                  borderColor: alpha(category.color, 0),
                  backgroundColor: alpha(category.color, 0.8),
                },
              })}
            >
              {podcastDetail.category}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
