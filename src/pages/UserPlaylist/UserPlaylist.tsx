import {
  Box,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { routes } from "@/common/constants";

import { usePrepare } from "./usePrepare";

const UserPlaylist = () => {
  const {
    classes,
    playlist,
    episodesDetail,
    audioIsPlaying,
    loadingEpisodes,
    playingEpisodeId,
    t,
    cx,
    handlePauseAudio,
    handleRemovePlaylist,
    handleDownloadAndPlayAudio,
    handleRemoveEpisodeFromPlaylist,
  } = usePrepare();

  if (loadingEpisodes) {
    return <>Loading...</>;
  }

  return (
    <Box className={classes.content}>
      <Button
        color="error"
        endIcon={<DeleteIcon />}
        onClick={handleRemovePlaylist}
        className={classes.removePlaylistBtn}
      >
        Delete Playlist
      </Button>

      {episodesDetail.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="Playlist episodes table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.playColumnHeader}>#</TableCell>
                <TableCell>{t("title")}</TableCell>
                <TableCell>{t("podcast")}</TableCell>
                <TableCell>{t("releaseDateHeading")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {episodesDetail.map((episode) => {
                const isCurrentEpisodePlaying =
                  playingEpisodeId === episode?.id;

                return (
                  <TableRow
                    key={episode.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className={classes.playColumn}>
                      <Box
                        component="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          if (isCurrentEpisodePlaying && audioIsPlaying) {
                            handlePauseAudio();
                          } else {
                            handleDownloadAndPlayAudio({
                              title: episode?.title ?? "",
                              episodeId: episode?.id ?? "",
                              podcastId: episode.podcast.id,
                              coverUrl: playlist?.coverUrl ?? "",
                              author: episode.podcast.author.name,
                              pathToFile: episode?.pathToFile ?? "",
                            });
                          }
                        }}
                      >
                        {audioIsPlaying && isCurrentEpisodePlaying ? (
                          <PauseIcon
                            className={cx({
                              [classes.activeColor]: isCurrentEpisodePlaying,
                            })}
                          />
                        ) : (
                          <>
                            <PodcastsIcon
                              className={cx(classes.icon, classes.podcastIcon, {
                                [classes.activeColor]: isCurrentEpisodePlaying,
                              })}
                            />
                            <PlayArrowIcon
                              className={cx(classes.playIcon, {
                                [classes.activeColor]: isCurrentEpisodePlaying,
                              })}
                            />
                          </>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell
                      scope="row"
                      component="th"
                      className={classes.titleCell}
                    >
                      <Box className={classes.titleContainer}>
                        <img
                          className={classes.img}
                          width="40px"
                          height="40px"
                          src={episode.podcast.coverUrl}
                          alt={`${episode.title} cover photo`}
                        />

                        <Box className={classes.titleContent}>
                          <Link
                            className={cx(classes.title, {
                              [classes.activeColor]: isCurrentEpisodePlaying,
                            })}
                            to={routes.episode.replace(":id", episode.id)}
                          >
                            {episode.title}
                          </Link>
                          <Typography className={classes.author}>
                            {episode.podcast.author.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell className={classes.podcastCell}>
                      <Box className={classes.podcastContainer}>
                        <Typography
                          component={Link}
                          className={classes.podcastTitle}
                          to={routes.playlist.replace(
                            ":id",
                            episode.podcast.id
                          )}
                        >
                          {episode.podcast.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {/* {format(new Date(Date.now()), "MMM d, y")} */}
                      {t("releaseDate", {
                        val: new Date(episode?.publishedDate ?? Date.now()),
                        formatParams: {
                          val: {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        },
                      })}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          handleRemoveEpisodeFromPlaylist({
                            episode: {
                              episodeId: episode.id,
                              addedDate: episode.addedDate,
                              podcastId: episode.podcast.id,
                            },
                            playlistId: playlist?.id ?? "",
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box className={classes.content}>This playlist is empty!</Box>
      )}
    </Box>
  );
};

export default UserPlaylist;
