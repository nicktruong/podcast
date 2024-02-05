import { useEffect, useRef, useState } from "react";
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

export const usePrepareHook = () => {
  const dispatch = useAppDispatch();

  const { classes } = useStyles();

  const { id } = useParams();

  const currentUser = useAppSelector(selectUser);

  const isMyProfile = currentUser?.id === id;

  const userProfile = useAppSelector(selectUserProfile);

  const user = isMyProfile ? { ...currentUser, ...userProfile } : userProfile;

  const playlists = useAppSelector(selectPlaylists);

  const episodes = useAppSelector(selectEpisodesOfCreator);

  const [fontSize, setFontSize] = useState("96px");
  const headingRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // resize the podcast title to fit (not overflow) the parent element

    const resizeToFit = () => {
      if (!headingRef.current || !containerRef.current) {
        return;
      }

      if (headingRef.current.clientHeight < containerRef.current.clientHeight) {
        return;
      }

      const fontSize = window.getComputedStyle(headingRef.current).fontSize;

      const reducedFontSize = parseFloat(fontSize) - 1 + "px";
      // line below is needed to calculate immediate clientHeight
      headingRef.current.style.fontSize = reducedFontSize;
      setFontSize(reducedFontSize);

      resizeToFit();
    };

    resizeToFit();
  }, [user?.name]);

  useEffect(() => {
    if (id) {
      // get user info
      if (currentUser?.id !== id) {
        dispatch(fetchUserInfo(id));
      }

      dispatch(fetchEpisodesFromCreatorPaged({ creatorId: id }));
    }
  }, [id]);

  return {
    user,
    classes,
    episodes,
    fontSize,
    playlists,
    headingRef,
    isMyProfile,
    containerRef,
  };
};
