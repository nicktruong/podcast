/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  selectPodcastsToTry,
  selectPodcastsForYou,
  selectRecentlyPlayed,
  selectTrendingPodcasts,
  fetchPodcastsToTryPaged,
  fetchPodcastsForYouPaged,
  fetchTrendingPodcastsPaged,
  selectIsLoadingListenerPodcasts,
  fetchRecentlyPlayedPodcastsPaged,
} from "@/store/listenerPodcasts";
import { selectUser } from "@/store/user";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { useStyles } from "./styles";
import { SectionData } from "./interfaces";

const usePrepare = () => {
  const { t } = useTranslation("Home");

  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const podcastsToTry = useAppSelector(selectPodcastsToTry);
  const podcastsForYou = useAppSelector(selectPodcastsForYou);
  const recentlyPlayed = useAppSelector(selectRecentlyPlayed);
  const trendingPodcasts = useAppSelector(selectTrendingPodcasts);

  const loading = useAppSelector(selectIsLoadingListenerPodcasts);

  const sections: SectionData[] = [
    {
      key: "recentlyPlayed",
      title: t("recentlyPlayed"),
      podcasts: recentlyPlayed,
    },
    {
      key: "trendings",
      title: t("trendings"),
      podcasts: trendingPodcasts,
    },
    {
      key: "podcastsForYou",
      title: t("podcastsForYou"),
      podcasts: podcastsForYou,
    },
    {
      key: "podcastsToTry",
      title: t("podcastsToTry"),
      podcasts: podcastsToTry,
    },
  ];

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       if (user) {
  //         await dispatch(
  //           fetchRecentlyPlayedPodcastsPaged({
  //             userHistory: user.history ?? [],
  //           })
  //         );
  //       }

  //       const fetchedPodcastIds: string[] = [];

  //       const trendingPodcasts = await dispatch(
  //         fetchTrendingPodcastsPaged({ pageSize: 7 })
  //       ).unwrap();

  //       fetchedPodcastIds.push(
  //         ...(trendingPodcasts.map((podcast) => podcast.id) ?? [])
  //       );

  //       if (!user) return;

  //       const podcastsForYou = await dispatch(
  //         fetchPodcastsForYouPaged({
  //           period: 30,
  //           pageSize: 7,
  //           podcastIdsToExclude: fetchedPodcastIds,
  //           categories: user.categoriesOfInterest ?? [],
  //         })
  //       ).unwrap();

  //       fetchedPodcastIds.push(
  //         ...(podcastsForYou.map((podcast) => podcast.id) ?? [])
  //       );

  //       await dispatch(
  //         fetchPodcastsToTryPaged({
  //           pageSize: 7,
  //           podcastIdsToExclude: fetchedPodcastIds,
  //         })
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   init();
  // }, [user]);

  return {
    classes,
    loading,
    sections,
  };
};

export default usePrepare;
