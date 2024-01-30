import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { UploadTask } from "@firebase/storage";
import { joiResolver } from "@hookform/resolvers/joi";

import {
  setPrevStep,
  setProgress,
  selectProgress,
  selectUploading,
  selectUploadStep,
  selectEpisodeInfo,
  setPathToAudioFile,
  resetUploadPodState,
  setPodUploadDetails,
  publishEpisodeAction,
} from "@/store/episode";
import { uploadFile } from "@/firebase";
import { selectUser, setUser } from "@/store/user";
import { EpisodeCreationSteps } from "@/common/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectPodcast, selectTempImg } from "@/store/podcast";
import { EPISODE_CREATION_DEFAULT_DATA } from "@/common/constants";

import schema from "./schema";

import type { UsePrepareHookProps } from "./interfaces";
import type { EpisodeBasicCreationData } from "@/common/interfaces";

const usePrepare = ({ handleClose }: UsePrepareHookProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const step = useAppSelector(selectUploadStep);
  const podInfo = useAppSelector(selectEpisodeInfo);
  const podcast = useAppSelector(selectPodcast);
  const tempImg = useAppSelector(selectTempImg);
  const image = podcast?.coverUrl ?? tempImg;
  const podUploading = useAppSelector(selectUploading);
  const podUploadingProgress = useAppSelector(selectProgress);
  const [uploadTask, setUploadTask] = useState<UploadTask>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EpisodeBasicCreationData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: joiResolver(schema),
    defaultValues: EPISODE_CREATION_DEFAULT_DATA,
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(
      setPodUploadDetails({ ...data, publishedDate: new Date().toISOString() })
    );
  });

  const onFileUpload = (acceptedFiles: File[]) => {
    const { uploadTask, fullPath } = uploadFile("audios", acceptedFiles[0]);
    setUploadTask(uploadTask);
    dispatch(setPathToAudioFile(fullPath));
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
        if (!user?.id) return;
        await dispatch(publishEpisodeAction(user.id));
        dispatch(setUser({ episodeCount: (user.episodeCount ?? 0) + 1 }));
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
