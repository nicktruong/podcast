import { format } from "date-fns";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Box, Button, IconButton, Typography } from "@mui/material";

import useHelper from "./useHelper";

export default function Playlist() {
  const {
    classes,
    seriesDetail,
    loadingDetail,
    titleFontSize,
    audioIsPlaying,
    seriesTitleRef,
    playingEpisodeId,
    seriesTitleContainerRef,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  } = useHelper();

  if (loadingDetail) {
    return <>Loading...</>;
  }

  return (
    <Box className={classes.playlistRoot}>
      <Box className={classes.playlistContent}>
        <Box component="header" className={classes.headerRoot}>
          <Box className={classes.seriesCoverContainer}>
            <img
              width="232px"
              height="232px"
              alt={seriesDetail.title}
              src={seriesDetail.coverUrl}
              className="rounded shadow-white shadow-md"
            />
          </Box>

          <Box className={classes.seriesInfo}>
            <Typography fontSize="14px">Podcast</Typography>
            <Box height="140px" ref={seriesTitleContainerRef}>
              <Typography
                fontWeight={700}
                ref={seriesTitleRef}
                fontSize={titleFontSize}
              >
                {seriesDetail.title}
              </Typography>
            </Box>
            <Typography fontSize="32px" fontWeight={700}>
              {seriesDetail.author?.name}
            </Typography>
          </Box>
        </Box>

        <Box className={classes.actions}>
          <Button className={classes.followBtn} variant="outlined">
            Follow
          </Button>
          <IconButton className={classes.moreIconBtn}>
            <MoreHorizIcon className={classes.moreIcon} />
          </IconButton>
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
                  <Box key={podcast.id} className={classes.episode}>
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
                Trải nghiệm? là nơi để bạn hiếu kì, tò mò và muốn hiểu biết hơn
                về UX/UI. Hãy áp dụng Trải nghiệm! để trở thành một người cầu
                nối giữa người dùng và sản phẩm tốt nhất.
                http://trainghiempodcast.com/
              </Typography>
            </Box>

            <Box>
              <Button className={classes.ratingBtn} variant="outlined">
                {/* TODO: Change when add rating */}
                <span>4.9</span>
                <StarBorderIcon className={classes.ratingBtnIcon} />
                <span className={classes.rateCount}>(16)</span>
              </Button>
            </Box>

            {/* TODO: Change to link component when implement search */}
            <Button className={classes.categoryBtn}>
              {seriesDetail.category}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
