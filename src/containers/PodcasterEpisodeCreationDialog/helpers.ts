import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { UploadTask } from "@firebase/storage";
import { joiResolver } from "@hookform/resolvers/joi";

import {
  setPrevStep,
  setProgress,
  setPathToImg,
  selectProgress,
  selectUploading,
  selectUploadStep,
  selectEpisodeInfo,
  setPathToAudioFile,
  resetUploadPodState,
  setPodUploadDetails,
  publishEpisodeAction,
} from "@/store/episode";
import { notifyFollower, uploadFile } from "@/firebase";
import { selectUser, setUser } from "@/store/user";
import { resizeImage } from "@/common/utils";
import { EPISODE_CREATION_STEPS } from "@/common/enums";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { EPISODE_CREATION_DEFAULT_DATA, IMAGE_SIZE } from "@/common/constants";
import { selectPodcast } from "@/store/podcast";

import schema from "./schema";

import type { UsePrepareHookProps } from "./interfaces";
import type { EpisodeBasicCreationData } from "@/common/interfaces";

const usePrepareHook = ({ onClose: handleClose }: UsePrepareHookProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const step = useAppSelector(selectUploadStep);
  const episodeInfo = useAppSelector(selectEpisodeInfo);
  const podcast = useAppSelector(selectPodcast);
  const podUploading = useAppSelector(selectUploading);
  const podUploadingProgress = useAppSelector(selectProgress);
  const [image, setImage] = useState("");
  const [uploadTask, setUploadTask] = useState<UploadTask>();

  const {
    reset,
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
    if (!user?.id) return;

    const { uploadTask, fullPath } = uploadFile(
      `audios/${user.id}`,
      acceptedFiles[0]
    );
    setUploadTask(uploadTask);
    dispatch(setPathToAudioFile(fullPath));
  };

  const onPhotoUpload = async (acceptedFiles: File[]) => {
    if (!user?.id) return;

    const image = await resizeImage(acceptedFiles[0], {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    });

    setImage(URL.createObjectURL(acceptedFiles[0]));

    const { fullPath } = uploadFile(`photos/${user.id}`, image);
    dispatch(setPathToImg(fullPath));
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
      case EPISODE_CREATION_STEPS.EDIT_DETAILS:
        onSubmit();
        break;

      case EPISODE_CREATION_STEPS.REVIEW_PUBLISH:
        if (!user?.id) return;

        if (!podcast) return;

        // Create notification to all followers
        await notifyFollower({
          podcastId: podcast.id,
          podcastName: podcast.title,
          creatorName: user.name ?? "",
          episodeName: episodeInfo.title,
          creatorAvatar: user.photoURL ?? "",
        });
        dispatch(setUser({ episodeCount: (user.episodeCount ?? 0) + 1 }));
        await dispatch(publishEpisodeAction(user.id));

        reset();
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
    podUploading,
    podInfo: episodeInfo,
    podUploadingProgress,
    onSubmit,
    handleNext,
    onFileUpload,
    handleCancel,
    onPhotoUpload,
    handleStepBack,
  };
};

export default usePrepareHook;
