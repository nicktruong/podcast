import { useTranslation } from "react-i18next";

export const usePrepare = () => {
  const { t } = useTranslation("SignUp");

  return { t };
};
