import { Box, Button, Typography } from "@mui/material";

import { usePrepareHook } from "./helpers";

const NotFound = () => {
  const { classes, goHome } = usePrepareHook();

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
