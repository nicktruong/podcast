import { Fragment } from "react";
import { Box } from "@mui/material";

import usePrepareHook from "./helpers";
import { Section, SectionSkeleton, StandoutPodcast } from "./components";

const Home = () => {
  const { user, classes, loading, sections } = usePrepareHook();

  return (
    <Box className={classes.homeRoot}>
      <Box className={classes.homeContent}>
        <StandoutPodcast />

        <Box className={classes.section}>
          {loading
            ? Array(user?.id ? 4 : 1)
                .fill(0)
                .map((_, index) => <SectionSkeleton key={index} />)
            : sections.map(({ key, title, podcasts, requireLogin }) => {
                if (!user && requireLogin) return <Fragment key={key} />;

                if (!user?.history?.length && key === "recentlyPlayed")
                  return <Fragment key={key} />;

                if (podcasts.length === 0) return <Fragment key={key} />;

                return <Section key={key} title={title} podcasts={podcasts} />;
              })}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
