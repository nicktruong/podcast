import { useEffect, useState } from "react";

import { selectUserId } from "@/store/user";
import { Collections } from "@/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setNewRating, selectPodcastDetail } from "@/store/details";
import { getUserRating, rate } from "@/firebase";

import { useStyles } from "./styles";

export const usePrepareHook = () => {
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
    if (!userId || !podcastDetail) return;

    const rateResult = await rate({
      userId,
      rating,
      type: Collections.PODCASTS,
      podcastOrSeriesId: podcastDetail?.id,
    });

    // TODO: Toast rate failed
    if (!rateResult) return;

    dispatch(setNewRating(rateResult));
  };

  return { userId, podcastDetail, classes, rating, setRating, handleRate };
};
