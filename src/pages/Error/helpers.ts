import { useNavigate } from "react-router-dom";

import { routes } from "@/constants";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const goHome = () => {
    navigate(routes.index);
  };

  return { classes, goHome };
};
