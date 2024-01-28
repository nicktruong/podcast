import { useTranslation } from "react-i18next";

export const usePrepare = () => {
  const { t } = useTranslation("PodcasterDashboard");

  return { t };
};
