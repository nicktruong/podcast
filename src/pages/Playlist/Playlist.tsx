import { Box, Button, Typography } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { routes } from "@/common/constants";

import usePrepare from "./usePrepare";
import PodcastRating from "./components/PlaylistRating";

export default function Playlist() {
  const {
    classes,
    openModal,
    seriesDetail,
    loadingDetail,
    audioIsPlaying,
    playingEpisodeId,
    handleOpenModal,
    handleCloseModal,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  } = usePrepare();

  if (loadingDetail) {
    return <>Loading...</>;
  }

  return (
    <Box>
      <Box className={classes.actions}>
        <Button className={classes.followBtn} variant="outlined">
          Follow
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

            {seriesDetail.podcasts.map((podcast) => {
              return (
                <Link
                  key={podcast.id}
                  to={routes.episode.replace(":id", podcast.id)}
                >
                  <Box className={classes.episode}>
                    <Box>
                      <Typography className={classes.episodeTitle}>
                        {podcast.title}
                      </Typography>
                      <Typography className={classes.seriesName}>
                        {seriesDetail.title}
                      </Typography>
                      <Typography className={classes.episodeDescription}>
                        {seriesDetail.description}
                      </Typography>
                    </Box>

                    <Box className={classes.playbar}>
                      <Box className={classes.playbarMainActions}>
                        <Box
                          component="button"
                          onClick={() => {
                            if (
                              playingEpisodeId === podcast.id &&
                              audioIsPlaying
                            ) {
                              handlePauseAudio();
                            } else {
                              handleDownloadAndPlayAudio({
                                episodeId: podcast.id,
                                pathToFile: podcast.pathToFile,
                              });
                            }
                          }}
                        >
                          {playingEpisodeId === podcast.id && audioIsPlaying ? (
                            <PauseCircleIcon className={classes.icon} />
                          ) : (
                            <PlayCircleIcon className={classes.icon} />
                          )}
                        </Box>

                        <Box className={classes.info}>
                          <Typography className={classes.date}>
                            {format(
                              new Date(seriesDetail.createdAt),
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
                </Link>
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
              <span>{seriesDetail.rating.toFixed(1)}</span>
              <StarBorderIcon className={classes.ratingBtnIcon} />
              <span className={classes.rateCount}>
                ({seriesDetail.rateCount})
              </span>
            </Button>
          </Box>

          {/* TODO: Change to link component when implement search */}
          <Button className={classes.categoryBtn}>
            {seriesDetail.category}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
