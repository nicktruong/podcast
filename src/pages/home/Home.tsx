import { Box } from "@mui/material";

import useHelper from "./useHelper";
import Section from "./components/Section";

export default function Home() {
  const { classes, sections } = useHelper();

  return (
    <Box className={classes.homeRoot}>
      <Box className={classes.homeContent}>
        {sections
          .filter(({ podcasts }) => podcasts.length > 0)
          .map(({ title, podcasts }, index) => (
            <Section
              key={index}
              title={title}
              classes={classes}
              podcasts={podcasts}
            />
          ))}
      </Box>
    </Box>
  );
}
