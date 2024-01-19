import { useEffect, useState } from "react";

import {
  setNewRating,
  selectSeriesDetail,
} from "@/store/userPodcastSeriesSlice";
import { selectUserId } from "@/store/userSlice";
import { getUserRate } from "@/firebase/getUserRate";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { ratePodcastOrSeries } from "@/firebase/ratePodcastOrSeries";
import { PODCAST_SERIES } from "@/common/constants/firestoreCollectionNames";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(0);

  const { id, title, coverUrl } = useAppSelector(selectSeriesDetail);

  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    if (userId && id) {
      getUserRate({ userId, podcastOrSeriesId: id }).then((rating) => {
        setRating(rating?.rating ?? 0);
        console.log(rating);
      });
    }
  }, [userId, id]);

  const handleRate = async () => {
    if (!userId) {
      return;
    }

    const { newRateCount, newRating } = await ratePodcastOrSeries({
      userId,
      rating,
      type: PODCAST_SERIES,
      podcastOrSeriesId: id,
    });
    dispatch(setNewRating({ newRateCount, newRating }));
  };

  return { userId, title, coverUrl, classes, rating, setRating, handleRate };
};
