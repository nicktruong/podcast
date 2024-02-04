import { useTranslation } from "react-i18next";

export const usePrepareHook = () => {
  const { t } = useTranslation("pages/SignUp");

  return { t };
};
