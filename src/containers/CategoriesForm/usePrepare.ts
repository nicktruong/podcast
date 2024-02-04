import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { t } = useTranslation("pages/SignUp");

  const { cx, classes } = useStyles();

  return { classes, t, cx };
};
