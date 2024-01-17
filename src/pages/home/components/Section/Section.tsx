import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PodcastSeriesWithAuthor } from "@/common/interfaces/PodcastSeries";
import routes from "@/common/constants/routes";

import { Styles } from "../../styles";

interface Props {
  classes: Styles;
  podcasts: PodcastSeriesWithAuthor[];
}

export default function Section({ classes, podcasts }: Props) {
  return (
    <Box className={classes.section} component="section">
      <Typography className={classes.homeTitle} component="h2">
        Trending podcasts
      </Typography>
      <Box className={classes.playlist}>
        {podcasts.map((podcast) => (
          <Link
            key={podcast.id}
            className={classes.series}
            to={routes.playlist.replace(":id", podcast.id)}
          >
            <Box>
              <img
                className={classes.seriesImg}
                src={podcast.coverUrl}
                alt={`${podcast.title} cover image`}
              />
            </Box>
            <Box className={classes.seriesInfo}>
              <Typography className={classes.seriesTitle}>
                {podcast.title}
              </Typography>
              <Typography className={classes.seriesAuthor}>
                By {podcast.author?.name}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
