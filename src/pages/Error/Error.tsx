import { Box, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { usePrepare } from "./usePrepare";
import { ErrorProps } from "./interfaces";

const Error = ({ error, resetError }: ErrorProps) => {
  const { classes, goHome } = usePrepare();

  return (
    <Box className={classes.errorRoot}>
      <Box className={classes.errorContent}>
        <ErrorOutlineIcon className={classes.errorIcon} />
        <Typography>An error occurred</Typography>
        <Typography>{error.message}</Typography>

        <Box className={classes.actions}>
          <Button className={classes.resetBtn} onClick={goHome}>
            Go Home
          </Button>
          <Typography>or</Typography>
          <Button className={classes.resetBtn} onClick={resetError}>
            Try Again
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Error;
