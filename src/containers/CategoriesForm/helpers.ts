import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";

import { useStyles } from "./styles";

import type { RegistrationInterests } from "@/common/interfaces";

interface UsePrepareHookOptions {
  chosenCategories: string[];
  setValue: UseFormSetValue<RegistrationInterests>;
}

export const usePrepareHook = ({
  chosenCategories,
  setValue,
}: UsePrepareHookOptions) => {
  const { t } = useTranslation("pages/SignUp");

  const { cx, classes } = useStyles();

  const handleCategoryClick = (isChosen: boolean, categoryName: string) => {
    if (!isChosen) {
      setValue("categoriesOfInterest", [...chosenCategories, categoryName]);
    } else {
      setValue(
        "categoriesOfInterest",
        chosenCategories.filter(
          (chosenCategory) => chosenCategory !== categoryName
        )
      );
    }
  };

  return { classes, t, cx, handleCategoryClick };
};
