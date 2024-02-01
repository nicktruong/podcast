import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { t } = useTranslation("pages/Home");

  return { classes, t, navigate };
};
