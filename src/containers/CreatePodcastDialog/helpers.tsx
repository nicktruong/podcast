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
} from "@/store/podcast";
import { selectUserId } from "@/store/user";
import { selectCategories } from "@/store/category";
import { PodcastCreationSteps } from "@/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { PODCAST_CREATION_DEFAULT_DATA } from "@/constants";

import schema from "./schema";
import { useStyles } from "./styles";
import { ImageForm, EditSeriesDetail } from "./components";

import type { PodcastCreationData } from "@/common/interfaces";

interface Props {
  handleClose: () => void;
}

const usePrepareHook = ({ handleClose }: Props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const step = useAppSelector(selectStep);
  const userId = useAppSelector(selectUserId);
  const podcast = useAppSelector(selectPodcast);
  const tempImg = useAppSelector(selectTempImg);
  const coverUrl = podcast?.coverUrl ?? tempImg;
  const categories = useAppSelector(selectCategories);

  const fileRef = useRef<HTMLInputElement>(null);

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
      case PodcastCreationSteps.INPUT_DETAILS: {
        const isValidDetails = await validatePodcastSeriesInfo();
        if (isValidDetails) onSubmit();
        break;
      }

      case PodcastCreationSteps.UPLOAD_COVER_IMG: {
        fileRef.current?.click();
        break;
      }

      case PodcastCreationSteps.CONFIRM_DETAILS_AND_CREATE: {
        if (!userId) return;
        dispatch(createPodcastAction(userId));
        handleClose();
        break;
      }

      default:
        break;
    }
  };

  const renderStep = () => {
    switch (step) {
      case PodcastCreationSteps.INPUT_DETAILS:
        return (
          <EditSeriesDetail
            errors={errors}
            classes={classes}
            control={control}
            categories={categories}
          />
        );
      case PodcastCreationSteps.UPLOAD_COVER_IMG:
      case PodcastCreationSteps.CONFIRM_DETAILS_AND_CREATE:
        return (
          <ImageForm
            title={
              step === PodcastCreationSteps.UPLOAD_COVER_IMG
                ? "Choose your cover art"
                : "Review your photo"
            }
            image={coverUrl}
            classes={classes}
          />
        );

      default:
        return <>404 Step not found!</>;
    }
  };

  const renderButtonText = () => {
    switch (step) {
      case PodcastCreationSteps.INPUT_DETAILS:
        return "Continue";

      case PodcastCreationSteps.UPLOAD_COVER_IMG:
        return "Upload an image";

      case PodcastCreationSteps.CONFIRM_DETAILS_AND_CREATE:
        return "Continue";

      default:
        return <>404 Step not found!</>;
    }
  };

  return {
    step,
    classes,
    fileRef,
    renderStep,
    handleNextStep,
    renderButtonText,
    handleImageSubmit,
  };
};

export default usePrepareHook;
