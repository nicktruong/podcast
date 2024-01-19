import { Box } from "@mui/material";

import usePrepare from "./usePrepare";
import Section from "./components/Section";

export default function Home() {
  const { classes, sections } = usePrepare();

  return (
    <Box className={classes.homeRoot}>
      <Box className={classes.homeContent}>
        {sections
          .filter(({ podcasts }) => podcasts.length > 0)
          .map(({ title, podcasts }, index) => (
            <Section key={index} title={title} podcasts={podcasts} />
          ))}
      </Box>
    </Box>
  );
}
