import { useForm } from "react-hook-form";
import { ChangeEventHandler, useRef } from "react";
import { joiResolver } from "@hookform/resolvers/joi";

import {
  selectStep,
  selectPodcast,
  selectTempImg,
  setSeriesDetails,
  uploadPodcastCover,
  createPodcastAction,
  selectPodcastCreationData,
} from "@/store/podcast";
import { selectUserId } from "@/store/user";
import { selectCategories } from "@/store/category";
import { PODCAST_CREATION_STEPS } from "@/common/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { PODCAST_CREATION_DEFAULT_DATA } from "@/common/constants";

import schema from "./schema";
import { useStyles } from "./styles";

import type { PodcastCreationData } from "@/common/interfaces";

interface Props {
  handleClose: () => void;
}

const useHelper = ({ handleClose }: Props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectStep);
  const userId = useAppSelector(selectUserId);
  const podcast = useAppSelector(selectPodcast);
  const tempImg = useAppSelector(selectTempImg);
  const coverUrl = podcast?.coverUrl ?? tempImg;
  const fileRef = useRef<HTMLInputElement>(null);
  const categories = useAppSelector(selectCategories);
  const podcastCreationData = useAppSelector(selectPodcastCreationData);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<PodcastCreationData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
    defaultValues: PODCAST_CREATION_DEFAULT_DATA,
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(setSeriesDetails(data));
  });

  const validatePodcastSeriesInfo = async () => {
    return trigger(["title", "description", "category"]);
  };

  const handleImageSubmit: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.[0] && userId) {
      dispatch(uploadPodcastCover({ userId, file: e.target.files[0] }));
    }
  };

  const handleNextStep = async () => {
    switch (step) {
      case PODCAST_CREATION_STEPS.INPUT_DETAILS: {
        const isValidDetails = await validatePodcastSeriesInfo();

        if (isValidDetails) {
          onSubmit();
        }

        break;
      }

      case PODCAST_CREATION_STEPS.UPLOAD_COVER_IMG: {
        fileRef.current?.click();
        break;
      }

      case PODCAST_CREATION_STEPS.CONFIRM_DETAILS_AND_CREATE: {
        if (!userId) return;
        dispatch(createPodcastAction(userId));
        handleClose();
        break;
      }

      default:
        break;
    }
  };

  return {
    step,
    podcast,
    errors,
    control,
    classes,
    fileRef,
    coverUrl,
    categories,
    podcastCreationData,
    onSubmit,
    handleNextStep,
    handleImageSubmit,
    validatePodcastSeriesInfo,
  };
};

export default useHelper;
