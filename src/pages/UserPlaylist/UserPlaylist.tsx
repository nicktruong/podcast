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
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import PodcastsIcon from "@mui/icons-material/Podcasts";

import { usePrepare } from "./usePrepare";

const UserPlaylist = () => {
  const { classes, playlistDetail, handleRemovePodcastFromPlaylist } =
    usePrepare();

  if (!playlistDetail) {
    return <Box className={classes.content}>404 Not Found!</Box>;
  }

  return (
    <Box className={classes.content}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.firstColumn}>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album or podcast</TableCell>
              <TableCell>Release date</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {playlistDetail?.podcasts.map((podcast) => (
              <TableRow
                key={podcast.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className={classes.firstColumn}>
                  <PodcastsIcon className={classes.icon} />
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
                      src={podcast.series.coverUrl}
                      alt={`${podcast.title} cover photo`}
                    />

                    <Box>
                      <Typography className={classes.title}>
                        {podcast.title}
                      </Typography>
                      <Typography className={classes.author}>
                        {podcast.series.author?.name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography className={classes.podcastTitle}>
                    {podcast.series.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  {format(new Date(Date.now()), "MMM d, y")}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      handleRemovePodcastFromPlaylist({
                        podcastId: podcast.id,
                        playlistId: playlistDetail.id,
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPlaylist;
