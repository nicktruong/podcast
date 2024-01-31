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
  selectListenerPodcastsFetched,
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

  const fetched = useAppSelector(selectListenerPodcastsFetched);
  const loading = useAppSelector(selectIsLoadingListenerPodcasts);

  const sections: SectionData[] = [
    {
      requireLogin: true,
      key: "recentlyPlayed",
      podcasts: recentlyPlayed,
      title: t("recentlyPlayed"),
    },
    {
      key: "trendings",
      requireLogin: false,
      title: t("trendings"),
      podcasts: trendingPodcasts,
    },
    {
      requireLogin: true,
      key: "podcastsForYou",
      podcasts: podcastsForYou,
      title: t("podcastsForYou"),
    },
    {
      requireLogin: true,
      key: "podcastsToTry",
      podcasts: podcastsToTry,
      title: t("podcastsToTry"),
    },
  ];

  useEffect(() => {
    const init = async () => {
      try {
        if (user) {
          await dispatch(
            fetchRecentlyPlayedPodcastsPaged({
              userHistory: user.history ?? [],
            })
          );
        }

        const fetchedPodcastIds: string[] = []; // Use to prevent duplicated podcasts

        const newTrendingPodcasts = !fetched.trendings
          ? await dispatch(fetchTrendingPodcastsPaged({ pageSize: 7 })).unwrap()
          : trendingPodcasts;

        fetchedPodcastIds.push(
          ...(newTrendingPodcasts.map((podcast) => podcast.id) ?? [])
        );

        if (!user) return;

        const newPodcastsForYou = !fetched.podcastsForYou
          ? await dispatch(
              fetchPodcastsForYouPaged({
                period: 30,
                pageSize: 7,
                podcastIdsToExclude: fetchedPodcastIds,
                categories: user.categoriesOfInterest ?? [],
              })
            ).unwrap()
          : podcastsForYou;

        fetchedPodcastIds.push(
          ...(newPodcastsForYou.map((podcast) => podcast.id) ?? [])
        );

        !fetched.podcastsToTry &&
          (await dispatch(
            fetchPodcastsToTryPaged({
              pageSize: 7,
              podcastIdsToExclude: fetchedPodcastIds,
            })
          ));
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [user]);

  return {
    user,
    classes,
    loading,
    sections,
  };
};

export default usePrepare;
