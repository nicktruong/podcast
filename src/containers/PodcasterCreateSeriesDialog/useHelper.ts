import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ChangeEventHandler, useRef } from "react";

import {
  selectStep,
  selectCoverImage,
  setSeriesDetails,
  uploadSeriesCover,
  createPodcastSeriesAction,
} from "@/store/podcastSeries";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCategories } from "@/store/category";
import { SeriesCreationSteps } from "@/common/enums";

import schema from "./schema";
import { useStyles } from "./styles";

import type { SeriesCreationData } from "@/common/interfaces";

interface Props {
  handleClose: () => void;
}

const useHelper = ({ handleClose }: Props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectStep);
  const image = useAppSelector(selectCoverImage);
  const fileRef = useRef<HTMLInputElement>(null);
  const categories = useAppSelector(selectCategories);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<SeriesCreationData>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
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
      dispatch(uploadSeriesCover(e.target.files[0]));
    }
  };

  const handleNextStep = async () => {
    switch (step) {
      case SeriesCreationSteps.INPUT_SERIES_DETAILS: {
        const isValidDetails = await validatePodcastSeriesInfo();

        if (isValidDetails) {
          onSubmit();
        }

        break;
      }

      case SeriesCreationSteps.UPLOAD_SERIES_COVER_IMG: {
        fileRef.current?.click();
        break;
      }

      case SeriesCreationSteps.CONFIRM_DETAILS_AND_CREATION: {
        dispatch(createPodcastSeriesAction());
        handleClose();
        break;
      }

      default:
        break;
    }
  };

  return {
    step,
    image,
    errors,
    control,
    classes,
    fileRef,
    categories,
    onSubmit,
    handleNextStep,
    handleImageSubmit,
    validatePodcastSeriesInfo,
  };
};

export default useHelper;
