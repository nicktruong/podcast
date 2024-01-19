import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { routes } from "@/common/constants";

import { usePrepare } from "./usePrepare";
import { SectionProps } from "./interfaces";

export default function Section({ title, podcasts }: SectionProps) {
  const { classes } = usePrepare();

  return (
    <Box className={classes.section} component="section">
      <Typography className={classes.sectionTitle} component="h2">
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
