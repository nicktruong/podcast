import { Box } from "@mui/material";

import usePrepare from "./usePrepare";
import { Section, SectionSkeleton } from "./components";

export default function Home() {
  const { classes, loading, sections } = usePrepare();

  return (
    <Box className={classes.homeRoot}>
      <Box className={classes.homeContent}>
        {sections
          .filter(({ podcasts }) => podcasts.length > 0)
          .map(({ key, title, podcasts }) => {
            if (podcasts.length && !loading[key]) {
              return <Section key={key} title={title} podcasts={podcasts} />;
            }

            return <SectionSkeleton key={key} />;
          })}
      </Box>
    </Box>
  );
}
