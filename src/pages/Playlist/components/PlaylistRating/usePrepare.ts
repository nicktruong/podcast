import { useEffect, useState } from "react";

import { selectUserId } from "@/store/user";
import { COLLECTIONS } from "@/common/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setNewRating, selectPodcastDetail } from "@/store/details";
import { getUserRating, rate } from "@/firebase";

import { useStyles } from "./styles";

export const usePrepare = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(0);

  const podcastDetail = useAppSelector(selectPodcastDetail);

  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    if (userId && podcastDetail?.id) {
      getUserRating({ userId, podcastOrSeriesId: podcastDetail.id }).then(
        (rating) => {
          setRating(rating?.rating ?? 0);
        }
      );
    }
  }, [userId, podcastDetail?.id]);

  const handleRate = async () => {
    if (!userId || !podcastDetail) {
      return;
    }

    const { newRateCount, newRating } = await rate({
      userId,
      rating,
      type: COLLECTIONS.PODCASTS,
      podcastOrSeriesId: podcastDetail?.id,
    });
    dispatch(setNewRating({ newRateCount, newRating }));
  };

  return { userId, podcastDetail, classes, rating, setRating, handleRate };
};
