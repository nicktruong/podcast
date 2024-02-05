import { Box, Skeleton } from "@mui/material";

import { useStyles } from "./styles";

const PodcastDetailsHeaderSkeleton = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.headerRoot}>
      <Box className={classes.seriesCoverContainer}>
        <Skeleton
          width="232px"
          height="232px"
          className="rounded"
          variant="rectangular"
        />
      </Box>

      <Box className={classes.seriesInfo}>
        <Skeleton height="32px" width="60px" variant="rounded" />
        <Skeleton
          height="100px"
          className="mt-5 max-w-[680px]"
          variant="rounded"
        />
        <Skeleton
          height="48px"
          width="320px"
          className="mt-4"
          variant="rounded"
        />
      </Box>
    </Box>
  );
};

export default PodcastDetailsHeaderSkeleton;
