import { Fragment } from "react";
import { Box } from "@mui/material";

import usePrepare from "./usePrepare";
import { Section, SectionSkeleton } from "./components";
import StandoutPodcast from "./components/StandoutPodcast";

export default function Home() {
  const { user, classes, loading, sections } = usePrepare();

  return (
    <Box className={classes.homeRoot}>
      <Box className={classes.homeContent}>
        <StandoutPodcast />

        <Box className={classes.section}>
          {Object.values(loading).includes(true) ? (
            <SectionSkeleton />
          ) : (
            sections.map(({ key, title, podcasts, requireLogin }) => {
              if (!user && requireLogin) return <Fragment key={key} />;

              if (user?.history?.length === 0 && key === "recentlyPlayed")
                return <Fragment key={key} />;

              if (!loading[key] && podcasts.length === 0)
                return <Fragment key={key} />;

              return <Section key={key} title={title} podcasts={podcasts} />;
            })
          )}
        </Box>
      </Box>
    </Box>
  );
}
