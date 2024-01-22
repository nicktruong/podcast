import { useParams } from "react-router-dom";
import { MouseEvent, SyntheticEvent, useEffect, useState } from "react";

import {
  createPlaylist,
  selectPlaylists,
  addToPlaylistAction,
} from "@/store/playlists";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectEpisodeDetail, setEpisodeId } from "@/store/details";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const episodeDetail = useAppSelector(selectEpisodeDetail);
  const playlists = useAppSelector(selectPlaylists);

  const { classes } = useStyles();

  const [tabIndex, setTabIndex] = useState(0);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const openActionMenu = Boolean(actionMenuAnchorEl);

  useEffect(() => {
    dispatch(setEpisodeId({ episodeId: id ?? "" }));
  }, []);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleActionMenuBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleCreatePlaylist = () => {
    dispatch(createPlaylist());
    handleActionMenuClose();
  };

  const handleAddToPlaylist = (playlistId: string) => {
    dispatch(addToPlaylistAction({ playlistId }));
    handleActionMenuClose();
  };

  return {
    classes,
    tabIndex,
    playlists,
    episodeDetail,
    openActionMenu,
    actionMenuAnchorEl,
    handleTabChange,
    handleAddToPlaylist,
    handleCreatePlaylist,
    handleActionMenuClose,
    handleActionMenuBtnClick,
  };
};
