import { Box, Skeleton } from "@mui/material";

import { usePrepare } from "./usePrepare";

const SectionSkeleton = () => {
  const { classes } = usePrepare();

  const genCardSkeletons = () => {
    const skeletons: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      skeletons.push(
        <Box key={i} className={classes.cardSkeleton}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            className={classes.imgSkeleton}
          />

          <Box className={classes.textSkeletonContainer}>
            <Skeleton
              animation="wave"
              className={classes.podcastTitleSkeleton}
            />
            <Skeleton animation="wave" className={classes.authorNameSkeleton} />
          </Box>
        </Box>
      );
    }

    return skeletons;
  };

  return (
    <Box className={classes.skeletonSection}>
      <Skeleton animation="wave" className={classes.titleSkeleton} />
      <Box className={classes.cardSkeletonContainer}>{genCardSkeletons()}</Box>
    </Box>
  );
};

export default SectionSkeleton;
