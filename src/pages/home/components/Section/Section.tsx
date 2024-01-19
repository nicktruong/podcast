import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PodcastSeriesWithAuthor } from "@/common/interfaces/PodcastSeries";
import routes from "@/common/constants/routes";

import { Styles } from "../../styles";

interface Props {
  title: string;
  classes: Styles;
  podcasts: PodcastSeriesWithAuthor[];
}

export default function Section({ classes, title, podcasts }: Props) {
  return (
    <Box className={classes.section} component="section">
      <Typography className={classes.homeTitle} component="h2">
        {title}
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
                alt={`${podcast.title} cover photo`}
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
