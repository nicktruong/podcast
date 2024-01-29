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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { usePrepare } from "./usePrepare";

const UserPlaylist = () => {
  const {
    classes,
    playlist,
    episodesDetail,
    t,
    cx,
    handleRemovePodcastFromPlaylist,
  } = usePrepare();

  if (!episodesDetail.length) {
    return <Box className={classes.content}>This playlist is empty!</Box>;
  }

  return (
    <Box className={classes.content}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.firstColumn}>#</TableCell>
              <TableCell>{t("title")}</TableCell>
              <TableCell>{t("podcast")}</TableCell>
              <TableCell>{t("releaseDateHeading")}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {episodesDetail.map((episode) => {
              return (
                <TableRow
                  key={episode.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className={classes.firstColumn}>
                    <PodcastsIcon
                      className={cx(classes.icon, classes.podcastIcon)}
                    />
                    <PlayArrowIcon
                      className={cx(classes.icon, classes.playIcon)}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
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
                        <Typography className={classes.title}>
                          {episode.title}
                        </Typography>
                        <Typography className={classes.author}>
                          {episode.podcast.author.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className={classes.podcastContainer}>
                      <Typography className={classes.podcastTitle}>
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
                      onClick={() =>
                        handleRemovePodcastFromPlaylist({
                          podcastId: episode.id,
                          playlistId: playlist?.id ?? "",
                        })
                      }
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
    </Box>
  );
};

export default UserPlaylist;
