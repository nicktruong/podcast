import { Box, Typography } from "@mui/material";

import { routes } from "@/common/constants";

import Card from "../Card";

import { usePrepare } from "./usePrepare";

import type { SectionProps } from "./interfaces";

export default function Section({ title, podcasts }: SectionProps) {
  const { classes, t } = usePrepare();

  return (
    <Box className={classes.section} component="section">
      <Typography className={classes.sectionTitle} component="h2">
        {t(title)}
      </Typography>
      <Box className={classes.playlist}>
        {podcasts.map((podcast) => (
          <Card
            key={podcast.id}
            title={podcast.title}
            image={podcast.coverUrl}
            author={podcast.author.name}
            imageAlt={`${podcast.title} cover photo`}
            link={routes.playlist.replace(":id", podcast.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
