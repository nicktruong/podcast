import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/hooks";
import { selectUIState } from "@/store/ui";
import { selectCategories } from "@/store/category";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
  const { t } = useTranslation("pages/Home");

  const { classes } = useStyles();

  const categories = useAppSelector(selectCategories);
  const { isSidebarExpand } = useAppSelector(selectUIState);

  return { classes, categories, isSidebarExpand, t };
};
