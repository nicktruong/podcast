import { format } from "date-fns";
import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { routes } from "@/common/constants";

import usePrepare from "./usePrepare";
import PodcastRating from "./components/PlaylistRating";

export default function Playlist() {
  const {
    user,
    classes,
    openModal,
    podcastDetail,
    episodesDetail,
    audioIsPlaying,
    playingEpisodeId,
    navigate,
    handleFollow,
    handleOpenModal,
    handleCloseModal,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  } = usePrepare();

  return (
    <Box>
      <Box className={classes.actions}>
        <Button
          variant="outlined"
          onClick={handleFollow}
          className={classes.followBtn}
        >
          {!user?.following?.includes(podcastDetail?.id ?? "")
            ? "Follow"
            : "Unfollow"}
        </Button>
      </Box>

      <Box className={classes.playlistMain}>
        <Box className={classes.episodes}>
          {/* TODO Uncomment when implementing history */}
          {/* <Box className={cx(classes.episode, classes.continueEpisode)}>
              <Typography className={classes.continueListeningEpLabel}>
                Continue listening
              </Typography>
              <Typography className={classes.episodeTitle}>
                #32 - 7 bài học để trở thành 1 &quot;intermediate&quot; UX
                designer
              </Typography>
              <Typography className={classes.seriesName}>
                Trải nghiệm?!
              </Typography>
              <Typography className={classes.episodeDescription}>
                Năm 2023 trôi qua, mình học được 7 kĩ năng đã giúp mình trở
                thành 1 intermediate UX designer. Ngoài những cái bài học bạn
                hay nghe như là &quot;học dùng platform&quot;, có những kĩ năng
                mềm gì mọi người có thể học để nâng cấp level designer của bạn
              </Typography>

              <Box className={classes.playbar}>
                <Box className={classes.playbarMainActions}>
                  <Box component="button">
                    <PlayCircleIcon className={classes.icon} />
                  </Box>

                  <Box className={classes.info}>
                    <Typography className={classes.date}>Jan 3</Typography>
                    <Box className={classes.dot}>·</Box>
                    <Typography className={classes.timeleft}>
                      36 min 27 sec left
                    </Typography>
                    <LinearProgress
                      className={classes.timeline}
                      variant="determinate"
                      value={100}
                    />
                  </Box>
                </Box>

                <Box>
                  <Box component="button">
                    <AddCircleIcon className={classes.iconSecondary} />
                  </Box>
                </Box>
              </Box>
            </Box> */}

          <Box>
            <Typography className={classes.allEpisodes}>
              All Episodes
            </Typography>

            {episodesDetail.map((episode) => {
              return (
                <Box
                  key={episode.id}
                  onClick={() => {
                    navigate(routes.episode.replace(":id", episode.id));
                  }}
                >
                  <Box className={classes.episode}>
                    <Box>
                      <Typography className={classes.episodeTitle}>
                        {episode.title}
                      </Typography>
                      <Typography className={classes.seriesName}>
                        {podcastDetail?.title}
                      </Typography>
                      <Typography className={classes.episodeDescription}>
                        {podcastDetail?.description}
                      </Typography>
                    </Box>

                    <Box className={classes.playbar}>
                      <Box className={classes.playbarMainActions}>
                        <Box
                          component="button"
                          onClick={(event) => {
                            event.stopPropagation();

                            if (
                              playingEpisodeId === episode.id &&
                              audioIsPlaying
                            ) {
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
                            {format(
                              new Date(podcastDetail?.createdAt ?? Date.now()),
                              "MMM d y"
                            )}
                          </Typography>
                          {/* TODO: add progress bar when implementing history */}
                          {/* {!!durationInSeconds && (
                            <>
                              <Box className={classes.dot}>·</Box>
                              <Typography className={classes.timeleft}>
                                {padZero(durationRemain.minutes)} min{" "}
                                {padZero(durationRemain.seconds)} sec left
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                className={classes.timeline}
                                value={passedTimeInSeconds / durationInSeconds}
                              />
                            </>
                          )} */}
                        </Box>
                      </Box>

                      <Box>
                        <Box component="button">
                          <AddCircleIcon className={classes.iconSecondary} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box className={classes.about}>
          <Box>
            <Typography className={classes.aboutHeading} component="h3">
              About
            </Typography>
            <Typography className={classes.aboutDetail}>
              {/* TODO: Change when Add profile & Bio */}
              Mình là Nhi và mình là podcast host của Trải Nghiệm?!. Hãy biến
              Trải nghiệm? là nơi để bạn hiếu kì, tò mò và muốn hiểu biết hơn về
              UX/UI. Hãy áp dụng Trải nghiệm! để trở thành một người cầu nối
              giữa người dùng và sản phẩm tốt nhất.
              http://trainghiempodcast.com/
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
                ({podcastDetail?.rateCount ?? 0})
              </span>
            </Button>
          </Box>

          {/* TODO: Change to link component when implement search */}
          {podcastDetail && (
            <Button className={classes.categoryBtn}>
              {podcastDetail.category}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
