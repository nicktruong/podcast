import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { t } = useTranslation("pages/SignUp");

  const { cx, classes } = useStyles();

  return { classes, t, cx };
};
