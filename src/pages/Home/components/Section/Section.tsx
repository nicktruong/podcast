import { Box, Typography } from "@mui/material";

import CardGroup from "../CardGroup";

import { usePrepareHook } from "./helpers";

import type { SectionProps } from "./interfaces";

export default function Section({ title, podcasts }: SectionProps) {
  const { classes, t } = usePrepareHook();

  return (
    <Box className={classes.section} component="section">
      <Typography className={classes.sectionTitle} component="h2">
        {t(title)}
      </Typography>
      <Box className={classes.cards}>
        <CardGroup podcasts={podcasts.slice(0, 4)} />
      </Box>
    </Box>
  );
}
