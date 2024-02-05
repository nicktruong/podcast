import { Box } from "@mui/material";

import TitleSkeleton from "../TitleSkeleton";
import CardsSkeleton from "../CardsSkeleton";

import { usePrepare } from "./usePrepare";

const SectionSkeleton = () => {
  const { classes } = usePrepare();

  return (
    <Box className={classes.skeletonSection}>
      <TitleSkeleton />
      <CardsSkeleton mt={1} />
    </Box>
  );
};

export default SectionSkeleton;
