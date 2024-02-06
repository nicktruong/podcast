import { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";

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

const selectPodcasts = createSelector(
  [
    selectPodcastsToTry,
    selectPodcastsForYou,
    selectRecentlyPlayed,
    selectTrendingPodcasts,
  ],
  (podcastsToTry, podcastsForYou, recentlyPlayed, trendingPodcasts) => {
    return {
      podcastsToTry,
      podcastsForYou,
      recentlyPlayed,
      trendingPodcasts,
    };
  }
);

const selectPodcastsLoading = createSelector(
  [selectIsLoadingListenerPodcasts],
  (loading) =>
    loading.podcastsForYou ||
    loading.podcastsToTry ||
    loading.recentlyPlayed ||
    loading.trendingPodcasts
);

const usePrepareHook = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  // const user = null;

  // const podcastsToTry = useAppSelector(selectPodcastsToTry);
  // const podcastsForYou = useAppSelector(selectPodcastsForYou);
  // const recentlyPlayed = useAppSelector(selectRecentlyPlayed);
  // const trendingPodcasts = useAppSelector(selectTrendingPodcasts);
  const loading = useAppSelector(selectPodcastsLoading);

  const podcastsObj = useAppSelector(selectPodcasts) ?? {
    podcastsToTry: [],
    recentlyPlayed: [],
    podcastsForYou: [],
    trendingPodcasts: [],
  };

  const { podcastsForYou, podcastsToTry, recentlyPlayed, trendingPodcasts } =
    podcastsObj;

  // const fetched = useAppSelector(selectListenerPodcastsFetched);
  // const loading = useAppSelector(selectIsLoadingListenerPodcasts);
  // const fetched = null;
  // const loading = null;

  // const [fetched, setFetched] = useState(false);
  // const [loading, setLoading] = useState(true);

  const sections: SectionData[] = [
    {
      requireLogin: true,
      key: "recentlyPlayed",
      podcasts: recentlyPlayed,
      title: "recentlyPlayed",
    },
    {
      key: "trendingPodcasts",
      requireLogin: false,
      title: "trendingPodcasts",
      podcasts: trendingPodcasts,
    },
    {
      requireLogin: true,
      key: "podcastsForYou",
      podcasts: podcastsForYou,
      title: "podcastsForYou",
    },
    {
      requireLogin: true,
      key: "podcastsToTry",
      podcasts: podcastsToTry,
      title: "podcastsToTry",
    },
  ];

  useEffect(() => {
    const init = async () => {
      try {
        if (user) {
          await dispatch(
            fetchRecentlyPlayedPodcastsPaged({
              pageSize: 4,
              userHistory: user.history ?? [],
            })
          );
        }

        const fetchedPodcastIds: string[] = []; // Use to prevent duplicated podcasts

        const newTrendingPodcasts =
          trendingPodcasts.length === 0
            ? await dispatch(
                fetchTrendingPodcastsPaged({ pageSize: 5 })
              ).unwrap()
            : trendingPodcasts;

        fetchedPodcastIds.push(
          ...(newTrendingPodcasts.map((podcast) => podcast.id) ??
            [])
        );

        if (!user) return;
        const newPodcastsForYou =
          podcastsForYou.length === 0
            ? await dispatch(
                fetchPodcastsForYouPaged({
                  period: 30,
                  pageSize: 4,
                  podcastIdsToExclude: fetchedPodcastIds,
                  categories: user.categoriesOfInterest ?? [],
                })
              ).unwrap()
            : podcastsForYou;

        fetchedPodcastIds.push(
          ...(newPodcastsForYou.map((podcast) => podcast.id) ?? [])
        );

        podcastsToTry.length === 0 &&
          (await dispatch(
            fetchPodcastsToTryPaged({
              pageSize: 4,
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

export default usePrepareHook;
