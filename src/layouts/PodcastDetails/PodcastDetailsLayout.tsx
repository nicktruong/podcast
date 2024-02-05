import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { usePrepare } from "./usePrepare";
import PodcastDetailsHeader from "./components/PodcastDetailsHeader";

const PodcastDetailsLayout = () => {
  const { classes } = usePrepare();

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
