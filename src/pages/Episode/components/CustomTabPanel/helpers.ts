import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { classes } = useStyles();

  return { classes };
};
