import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectUser } from "@/store/user";
import { selectPlaylists } from "@/store/playlists";
import {
  fetchEpisodesFromCreatorPaged,
  selectEpisodesOfCreator,
} from "@/store/episode";
import { fetchUserInfo, selectUserProfile } from "@/store/profile";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const { id } = useParams();

  const currentUser = useAppSelector(selectUser);

  const isMyProfile = currentUser?.id === id;

  const userProfile = useAppSelector(selectUserProfile);

  const user = isMyProfile ? { ...currentUser, ...userProfile } : userProfile;

  const playlists = useAppSelector(selectPlaylists);

  const episodes = useAppSelector(selectEpisodesOfCreator);

  useEffect(() => {
    if (id) {
      // get user info
      if (currentUser?.id !== id) {
        dispatch(fetchUserInfo(id));
      }

      dispatch(fetchEpisodesFromCreatorPaged({ creatorId: id }));
    }
  }, [id]);

  return { classes, playlists, episodes, user, isMyProfile };
};
