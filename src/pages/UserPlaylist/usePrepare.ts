import { useParams } from "react-router-dom";

import {
  selectPlaylistDetail,
  removePodcastFromPlaylist,
} from "@/store/playlists";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const { cx, classes } = useStyles();

  const { id } = useParams();

  const playlistDetail = useAppSelector((state) =>
    selectPlaylistDetail(state, id ?? "")
  );

  const handleRemovePodcastFromPlaylist = ({
    podcastId,
    playlistId,
  }: {
    podcastId: string;
    playlistId: string;
  }) => {
    dispatch(removePodcastFromPlaylist({ playlistId, podcastId }));
  };

  return { cx, classes, playlistDetail, handleRemovePodcastFromPlaylist };
};
