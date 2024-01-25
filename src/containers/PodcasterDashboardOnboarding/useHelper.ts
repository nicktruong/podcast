import { selectPodcast } from "@/store/podcast";
import { selectEpisodesOfCreator } from "@/store/episode";
import { useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";

const useHelper = () => {
  const createdFirstEp =
    useAppSelector(selectEpisodesOfCreator)[0] !== undefined;

  const hasPodSeries = useAppSelector(selectPodcast);

  const { classes, cx } = useStyles();

  return {
    cx,
    classes,
    hasPodSeries,
    createdFirstEp,
  };
};

export default useHelper;
