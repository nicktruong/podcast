import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ChangeEventHandler, useRef } from "react";

import {
  selectStep,
  setSeriesDetails,
  uploadPodcastCover,
  createPodcastAction,
  selectPodcast,
  selectPodcastCreationData,
  selectTempImg,
} from "@/store/podcastSeries";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCategories } from "@/store/category";
import { PODCAST_CREATION_STEPS } from "@/common/enums";
import { FORM_DEFAULT_VALUES } from "@/common/constants";

import schema from "./schema";
import { useStyles } from "./styles";

import type { PodcastCreationData } from "@/common/interfaces";

interface Props {
  handleClose: () => void;
}

const { TITLE, CATEGORY, DESCRIPTION } = FORM_DEFAULT_VALUES;

const useHelper = ({ handleClose }: Props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectStep);
  const fileRef = useRef<HTMLInputElement>(null);
  const categories = useAppSelector(selectCategories);
  const podcast = useAppSelector(selectPodcast);
  const podcastCreationData = useAppSelector(selectPodcastCreationData);
  const tempImg = useAppSelector(selectTempImg);
  const coverUrl = podcast?.coverUrl ?? tempImg;

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<PodcastCreationData>({
    defaultValues: {
      title: TITLE,
      category: CATEGORY,
      description: DESCRIPTION,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(setSeriesDetails(data));
  });

  const validatePodcastSeriesInfo = async () => {
    return trigger(["title", "description", "category"]);
  };

  const handleImageSubmit: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.[0]) {
      dispatch(uploadPodcastCover(e.target.files[0]));
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
        dispatch(createPodcastAction());
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
