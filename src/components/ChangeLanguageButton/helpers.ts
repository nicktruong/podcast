import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { classes } = useStyles();
  const { i18n } = useTranslation();

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  return { i18n, classes, handleChangeLanguage };
};
