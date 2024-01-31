import { Box, Skeleton } from "@mui/material";

import { useStyles } from "./styles";

const PlaylistSkeleton = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.actions}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        className={classes.followBtnSkeleton}
      />

      <Box className={classes.playlistMain}>
        <Box className={classes.episodes}>
          <Skeleton
            animation="wave"
            className={classes.episodesHeadingSkeleton}
          />

          {new Array(2).fill("").map((_, index) => (
            <Box key={index} className={classes.episode}>
              <Skeleton
                animation="wave"
                className={classes.episodeTitleSkeleton}
              />
              <Skeleton
                animation="wave"
                className={classes.podcastNameSkeleton}
              />
              <Skeleton
                animation="wave"
                className={classes.episodeDescriptionSkeleton}
              />

              <Box className={classes.playbar}>
                <Box className={classes.playbarMainActions}>
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    className={classes.iconSkeleton}
                  />

                  <Skeleton animation="wave" className={classes.infoSkeleton} />
                </Box>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  className={classes.iconSkeleton}
                />
              </Box>
            </Box>
          ))}
        </Box>
        <Box className={classes.about}>
          <Skeleton animation="wave" className={classes.aboutHeadingSkeleton} />
          <Skeleton animation="wave" className={classes.aboutDetailSkeleton} />
          <Skeleton animation="wave" className={classes.ratingBtnSkeleton} />
          <Skeleton animation="wave" className={classes.categoryBtnSkeleton} />
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistSkeleton;
