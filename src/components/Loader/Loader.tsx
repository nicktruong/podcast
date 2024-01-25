import { Box } from "@mui/material";

import Logo from "../Logo";

import { useStyles } from "./styles";

const Loader = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.center}>
      <Box className={classes.loader} />
      <Logo />
    </Box>
  );
};

export default Loader;
