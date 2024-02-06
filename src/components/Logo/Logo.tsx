import { Box, Typography } from "@mui/material";
import PodcastsIcon from "@mui/icons-material/Podcasts";

import { useStyles } from "./styles";

import type { LogoProps } from "./interfaces";

export default function Logo({ hideText }: LogoProps) {
  const { classes } = useStyles();

  return (
    <Box className={classes.logoContainer}>
      <PodcastsIcon className={classes.logoIcon} />
      {!hideText && (
        <Typography className={classes.logoText} component="span">
          GO Podcast
        </Typography>
      )}
    </Box>
  );
}
