import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { UploadTask } from "@firebase/storage";
import { joiResolver } from "@hookform/resolvers/joi";

import {
  publishPodAction,
  resetUploadPodState,
  selectPodInfo,
  selectProgress,
  selectUploadStep,
  selectUploading,
  setPodPathToFile,
  setPodUploadDetails,
  setPrevStep,
  setProgress,
  setUploadStep,
} from "@/store/podSlice";
import { selectUser } from "@/store/userSlice";
import { uploadFile } from "@/firebase/uploadFile";
import { selectCoverImage } from "@/store/podSeriesSlice";
import { ICreateEpisodeDetails } from "@/common/interfaces";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { CreateEpisodeSteps } from "@/common/constants/create-episode-steps";

import schema from "./schema";

interface Props {
  handleClose: () => void;
}

const useHelper = ({ handleClose }: Props) => {
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
  } = useForm<ICreateEpisodeDetails>({
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
    dispatch(setUploadStep(CreateEpisodeSteps.REVIEW_PUBLISH));
  });

  const onFileUpload = (acceptedFiles: File[]) => {
    const { uploadTask, fullPath } = uploadFile("audios", acceptedFiles[0]);
    setUploadTask(uploadTask);
    dispatch(setPodPathToFile(fullPath));
    dispatch(setUploadStep(CreateEpisodeSteps.EDIT_DETAILS));
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
      case CreateEpisodeSteps.EDIT_DETAILS:
        onSubmit();
        break;

      case CreateEpisodeSteps.REVIEW_PUBLISH:
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

export default useHelper;
