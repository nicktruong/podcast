import { Skeleton } from "@mui/material";

import { usePrepare } from "./usePrepare";

const TitleSkeleton = () => {
  const { classes } = usePrepare();

  return <Skeleton animation="wave" className={classes.titleSkeleton} />;
};

export default TitleSkeleton;
