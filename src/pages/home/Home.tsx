import { Box } from "@mui/material";

import useHelper from "./useHelper";
import Section from "./components/Section";

export default function Home() {
  const { classes, trendingPodcasts, seriesForYou, seriesToTry } = useHelper();

  return (
    <Box className={classes.homeRoot}>
      <Box className={classes.homeContent}>
        {[trendingPodcasts, seriesForYou, seriesToTry].map(
          (podcasts, index) => (
            <Section key={index} classes={classes} podcasts={podcasts} />
          )
        )}
      </Box>
    </Box>
  );
}
