import { Box, Grid, Skeleton } from "@mui/material";

import { usePrepareHook } from "./helpers";

const CardsSkeleton = ({ mt }: { mt?: number }) => {
  const { classes, isSidebarExpand } = usePrepareHook();

  const genCardSkeletons = () => {
    const skeletons: JSX.Element[] = [];

    for (let i = 0; i < 8; i++) {
      skeletons.push(
        <Grid
          item
          key={i}
          md={isSidebarExpand ? 12 : 6}
          lg={isSidebarExpand ? 6 : 3}
        >
          <Box className={classes.cardSkeleton}>
            <Skeleton
              className={classes.imgSkeleton}
              variant="rounded"
              animation="wave"
            />
            <Skeleton
              className={classes.categoryBtnSkeleton}
              variant="rounded"
              animation="wave"
            />
            <Box>
              <Skeleton className={classes.titleSkeleton} animation="wave" />
              <Skeleton className={classes.titleSkeleton} animation="wave" />
              <Skeleton className={classes.titleSkeleton} animation="wave" />
            </Box>
            <Skeleton
              className={classes.createdAtSkeleton}
              variant="rounded"
              animation="wave"
            />
          </Box>
        </Grid>

        // <Box key={i} className={classes.cardSkeleton}>
        //   <Skeleton
        //     animation="wave"
        //     variant="rectangular"
        //     className={classes.imgSkeleton}
        //   />

        //   <Box className={classes.textSkeletonContainer}>
        //     <Skeleton
        //       animation="wave"
        //       className={classes.podcastTitleSkeleton}
        //     />
        //     <Skeleton animation="wave" className={classes.authorNameSkeleton} />
        //   </Box>
        // </Box>
      );
    }

    return skeletons;
  };

  return (
    <Box mt={mt}>
      <Grid container spacing={3}>
        {genCardSkeletons()}
      </Grid>
    </Box>
  );
};

export default CardsSkeleton;
