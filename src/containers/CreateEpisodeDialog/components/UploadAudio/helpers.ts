import { useTranslation } from "react-i18next";

export const usePrepareHook = () => {
  const { t } = useTranslation("pages/PodcasterDashboard");

  const dropzoneValidator = (file: File) => {
    if (file.type !== "audio/mpeg") {
      return {
        code: "wrong-extension",
        message: "Only mp3 file is accepted",
      };
    }

    return null;
  };

  return { t, dropzoneValidator };
};
