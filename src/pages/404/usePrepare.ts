import { useNavigate } from "react-router-dom";

import { routes } from "@/common/constants";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const goHome = () => {
    navigate(routes.index);
  };

  return { classes, goHome };
};
