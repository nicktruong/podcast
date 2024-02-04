import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/hooks/redux";
import { selectPodcast } from "@/store/podcast";
import { selectEpisodesOfCreator } from "@/store/episode";

import { useStyles } from "./styles";

const useHelper = () => {
  const { t } = useTranslation("pages/PodcasterDashboard");

  const createdFirstEp =
    useAppSelector(selectEpisodesOfCreator)[0] !== undefined;

  const hasPodcast = useAppSelector(selectPodcast);

  const { classes, cx } = useStyles();

  return {
    classes,
    hasPodcast,
    createdFirstEp,
    t,
    cx,
  };
};

export default useHelper;
