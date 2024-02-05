import { Box, Skeleton } from "@mui/material";

import { useStyles } from "./styles";

const StandoutPodcastSkeleton = () => {
  const { classes } = useStyles();

  return (
    <Box>
      <Skeleton
        animation="wave"
        variant="rounded"
        className={classes.standoutPodcastHeadingSkeleton}
      />
      <Box className={classes.standoutPodcastContainer}>
        <Box className={classes.standoutPodcast}>
          <Skeleton
            animation="wave"
            variant="rounded"
            className={classes.standoutPodcastImgSkeleton}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            className={classes.categoryBtnSkeleton}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            className={classes.standoutPodcastTitleSkeleton}
          />
          <Box className={classes.standoutPodcastDescSkeleton}>
            {new Array(5).fill(0).map((_, index) => (
              <Skeleton key={index} animation="wave" />
            ))}
          </Box>
        </Box>

        <Box className={classes.episodesContainer}>
          <Box className={classes.episodes}>
            {new Array(3).fill(0).map((_, index) => (
              <Box className={classes.episode} key={index}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  className={classes.episodeCoverSkeleton}
                />
                <Box className={classes.episodeInfo}>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    className={classes.episodeCreatedAtSkeleton}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    className={classes.episodeTitleSkeleton}
                  />
                  <Box>
                    <Skeleton
                      animation="wave"
                      className={classes.episodeDescSkeleton}
                    />
                    <Skeleton
                      animation="wave"
                      className={classes.episodeDescSkeleton}
                    />
                    <Skeleton
                      animation="wave"
                      className={classes.episodeDescSkeleton}
                    />
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      className={classes.playIconSkeleton}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StandoutPodcastSkeleton;
