import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ChangeEventHandler, useEffect, useRef } from "react";

import {
  createPodcastSeriesAction,
  selectCoverImage,
  selectStep,
  setSeriesDetails,
  uploadSeriesCover,
} from "@/store/podSeriesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { CreateSeriesSteps } from "@/common/constants/CreateSeriesSteps";
import { fetchCategories, selectCategories } from "@/store/categorySlice";
import { CreatePodcastSeries } from "@/common/interfaces/CreatePodcastSeries";

import schema from "./schema";
import { useStyles } from "./styles";

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
  } = useForm<CreatePodcastSeries>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
      case CreateSeriesSteps.INPUT_SERIES_DETAILS: {
        const isValidDetails = await validatePodcastSeriesInfo();

        if (isValidDetails) {
          onSubmit();
        }

        break;
      }

      case CreateSeriesSteps.UPLOAD_SERIES_COVER_IMG: {
        fileRef.current?.click();
        break;
      }

      case CreateSeriesSteps.CONFIRM_DETAILS_AND_CREATION: {
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
    onSubmit,
    categories,
    handleNextStep,
    handleImageSubmit,
    validatePodcastSeriesInfo,
  };
};

export default useHelper;
