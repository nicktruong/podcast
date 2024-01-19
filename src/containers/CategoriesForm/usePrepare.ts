import { useStyles } from "./styles";

export const usePrepare = () => {
  const styles = useStyles();

  return { ...styles };
};
