import { Box } from "@mui/material";

import TitleSkeleton from "../TitleSkeleton";
import CardsSkeleton from "../CardsSkeleton";

import { usePrepareHook } from "./helpers";

const SectionSkeleton = () => {
  const { classes } = usePrepareHook();

  return (
    <Box className={classes.skeletonSection}>
      <TitleSkeleton />
      <CardsSkeleton mt={1} />
    </Box>
  );
};

export default SectionSkeleton;
