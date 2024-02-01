import {
  playAudio,
  pauseAudio,
  setAudioInfo,
  selectAudioState,
  downloadAndPlayAudio,
  setPassedTimeInSeconds,
} from "@/store/audio";
import {
  selectStandOutPodcast,
  selectLoadingStandoutPodcast,
} from "@/store/listenerPodcasts";
import { selectUserId } from "@/store/user";
import { openAudioPlayer } from "@/store/ui";
import { addHistoryAction } from "@/store/history";
import { selectCategories } from "@/store/category";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { DownloadAndPlayAudioParameters } from "@/store/audio/interfaces";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const {
    playing: audioIsPlaying,
    episodeId: playingEpisodeId,
    downloaded: downloadedAudio,
  } = useAppSelector(selectAudioState);

  const categories = useAppSelector(selectCategories);
  const standoutPodcast = useAppSelector(selectStandOutPodcast);
  const isLoadingStandoutPodcast = useAppSelector(selectLoadingStandoutPodcast);
  const standoutCategory =
    categories.find(
      (category) => category.name === standoutPodcast?.category
    ) ?? categories[0];

  const handleDownloadAndPlayAudio = (data: DownloadAndPlayAudioParameters) => {
    const { pathToFile, ...audioInfo } = data;

    if (downloadedAudio && data.episodeId === playingEpisodeId) {
      dispatch(playAudio());

      return;
    }

    dispatch(setPassedTimeInSeconds(0));

    dispatch(setAudioInfo(audioInfo));

    dispatch(downloadAndPlayAudio(pathToFile));

    dispatch(openAudioPlayer());

    if (!userId) return;
    dispatch(addHistoryAction({ podcastId: data.podcastId, userId }));
  };

  const handlePauseAudio = () => {
    dispatch(pauseAudio());
  };

  return {
    audioIsPlaying,
    standoutPodcast,
    playingEpisodeId,
    standoutCategory,
    isLoadingStandoutPodcast,
    handlePauseAudio,
    handleDownloadAndPlayAudio,
  };
};
