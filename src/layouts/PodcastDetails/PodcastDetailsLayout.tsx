import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { usePrepareHook } from "./helpers";
import { PodcastDetailsHeader } from "./components";

const PodcastDetailsLayout = () => {
  const { classes } = usePrepareHook();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <PodcastDetailsHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PodcastDetailsLayout;
