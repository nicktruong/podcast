import { useEffect, useState } from "react";

import { selectUserId } from "@/store/user";
import { Collections } from "@/common/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setNewRating, selectSeriesDetail } from "@/store/details";
import { getUserRating, userRatePodcastOrSeries } from "@/firebase";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(0);

  const { id, title, coverUrl } = useAppSelector(selectSeriesDetail);

  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    if (userId && id) {
      getUserRating({ userId, podcastOrSeriesId: id }).then((rating) => {
        setRating(rating?.rating ?? 0);
      });
    }
  }, [userId, id]);

  const handleRate = async () => {
    if (!userId) {
      return;
    }

    const { newRateCount, newRating } = await userRatePodcastOrSeries({
      userId,
      rating,
      type: Collections.PODCAST_SERIES,
      podcastOrSeriesId: id,
    });
    dispatch(setNewRating({ newRateCount, newRating }));
  };

  return { userId, title, coverUrl, classes, rating, setRating, handleRate };
};
