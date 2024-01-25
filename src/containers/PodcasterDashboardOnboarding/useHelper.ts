import { selectPodcast } from "@/store/podcastSeries";
import { selectEpisodesOfCreator } from "@/store/podcast";
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
