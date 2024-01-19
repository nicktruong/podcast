import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { UploadTask } from "@firebase/storage";
import { joiResolver } from "@hookform/resolvers/joi";

import {
  setPrevStep,
  setProgress,
  setUploadStep,
  selectPodInfo,
  selectProgress,
  selectUploading,
  publishPodAction,
  selectUploadStep,
  setPodPathToFile,
  resetUploadPodState,
  setPodUploadDetails,
} from "@/store/podcast";
import { selectUser } from "@/store/user";
import { uploadFile } from "@/firebase";
import { EpisodeCreationSteps } from "@/common/enums";
import { selectCoverImage } from "@/store/podcastSeries";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import schema from "./schema";

import type { UsePrepareHookProps } from "./interfaces";
import type { EpisodeCreationData } from "@/common/interfaces";

const usePrepare = ({ handleClose }: UsePrepareHookProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const step = useAppSelector(selectUploadStep);
  const podInfo = useAppSelector(selectPodInfo);
  const image = useAppSelector(selectCoverImage);
  const podUploading = useAppSelector(selectUploading);
  const podUploadingProgress = useAppSelector(selectProgress);
  const [uploadTask, setUploadTask] = useState<UploadTask>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EpisodeCreationData>({
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(
      setPodUploadDetails({ ...data, publishedDate: new Date().toISOString() })
    );
    dispatch(setUploadStep(EpisodeCreationSteps.REVIEW_PUBLISH));
  });

  const onFileUpload = (acceptedFiles: File[]) => {
    const { uploadTask, fullPath } = uploadFile("audios", acceptedFiles[0]);
    setUploadTask(uploadTask);
    dispatch(setPodPathToFile(fullPath));
    dispatch(setUploadStep(EpisodeCreationSteps.EDIT_DETAILS));
  };

  const handleCancel = () => {
    uploadTask?.cancel();
    dispatch(resetUploadPodState());
  };

  const handleStepBack = () => {
    dispatch(setPrevStep());
  };

  useEffect(() => {
    if (uploadTask) {
      uploadTask.on("state_changed", (snapshot) => {
        // Get task progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        dispatch(setProgress(progress));
      });
    }
  }, [uploadTask]);

  const handleNext = async () => {
    switch (step) {
      case EpisodeCreationSteps.EDIT_DETAILS:
        onSubmit();
        break;

      case EpisodeCreationSteps.REVIEW_PUBLISH:
        await dispatch(publishPodAction());
        handleClose();
        break;

      default:
        break;
    }
  };

  return {
    step,
    user,
    image,
    errors,
    control,
    podInfo,
    onSubmit,
    handleNext,
    onFileUpload,
    handleCancel,
    podUploading,
    handleStepBack,
    podUploadingProgress,
  };
};

export default usePrepare;
