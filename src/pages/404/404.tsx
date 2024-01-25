import { Box, Button, Typography } from "@mui/material";

import { usePrepare } from "./usePrepare";

const NotFound = () => {
  const { classes, goHome } = usePrepare();

  return (
    <Box className={classes.notFoundRoot}>
      <Typography component="h1" className={classes.notFoundHeading}>
        Page not found
      </Typography>
      <Typography className={classes.notFoundReason}>
        We can&apos;t seem to find the page you are looking for.
      </Typography>
      <Button className={classes.homeBtn} onClick={goHome}>
        Home
      </Button>
    </Box>
  );
};

export default NotFound;
