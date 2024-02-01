import { Box, Grid, Typography } from "@mui/material";

import { routes } from "@/common/constants";

import Card from "../Card";

import { usePrepare } from "./usePrepare";

import type { SectionProps } from "./interfaces";

export default function Section({ title, podcasts }: SectionProps) {
  const { classes, categories, isSidebarExpand, t } = usePrepare();

  return (
    <Box className={classes.section} component="section">
      <Typography className={classes.sectionTitle} component="h2">
        {t(title)}
      </Typography>
      <Grid container spacing={3}>
        {podcasts.slice(0, 4).map((podcast) => (
          <Grid
            item
            md={isSidebarExpand ? 12 : 6}
            lg={isSidebarExpand ? 6 : 3}
            key={podcast.id}
          >
            <Card
              title={podcast.title}
              image={podcast.coverUrl}
              author={podcast.author.name}
              createdAt={podcast.createdAt}
              imageAlt={`${podcast.title} cover photo`}
              link={routes.playlist.replace(":id", podcast.id)}
              categoryData={
                categories.find(
                  (category) => category.name === podcast.category
                ) ?? categories[0]
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
