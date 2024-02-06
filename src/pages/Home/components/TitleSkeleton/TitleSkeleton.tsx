import { Skeleton } from "@mui/material";

import { usePrepareHook } from "./helpers";

const TitleSkeleton = () => {
  const { classes } = usePrepareHook();

  return <Skeleton animation="wave" className={classes.titleSkeleton} />;
};

export default TitleSkeleton;
