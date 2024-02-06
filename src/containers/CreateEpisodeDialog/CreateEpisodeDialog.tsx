import * as React from "react";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import { EpisodeCreationSteps } from "@/enums";

import usePrepareHook from "./helpers";
import {
  DialogBar,
  UploadAudio,
  UploadPhoto,
  EditDetails,
  ReviewPublish,
  BottomDialogBar,
} from "./components";
import { PodcasterEpisodeCreationDialogProps } from "./interfaces";

export default function CreateEpisodeDialog({
  open,
  onClose,
}: PodcasterEpisodeCreationDialogProps) {
  const {
    step,
    user,
    image,
    errors,
    control,
    podInfo,
    podUploading,
    podUploadingProgress,
    onSubmit,
    handleNext,
    onFileUpload,
    handleCancel,
    onPhotoUpload,
    handleStepBack,
  } = usePrepareHook({ onClose });

  const renderStep = () => {
    switch (step) {
      case EpisodeCreationSteps.UPLOAD_AUDIO:
        return <UploadAudio onFileUpload={onFileUpload} />;

      case EpisodeCreationSteps.EDIT_DETAILS:
        return (
          <EditDetails control={control} errors={errors} onSubmit={onSubmit} />
        );

      case EpisodeCreationSteps.UPLOAD_PHOTO:
        return <UploadPhoto onFileUpload={onPhotoUpload} />;

      case EpisodeCreationSteps.REVIEW_PUBLISH:
        return <ReviewPublish podInfo={podInfo} user={user} image={image} />;

      default:
        return <>404 Step not found!</>;
    }
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={onClose}>
        <DialogBar handleClose={onClose} step={step} />

        {/* Change based on step */}
        <Box
          sx={(theme) => ({
            width: "100%",
            margin: "0 auto",
            padding: "96px 56px 180px",
            maxWidth: theme.breakpoints.values.lg,
          })}
        >
          {renderStep()}
        </Box>

        {/* bottom app bar */}
        {step !== EpisodeCreationSteps.UPLOAD_AUDIO && (
          <BottomDialogBar
            handleCancel={handleCancel}
            handleNext={handleNext}
            handleStepBack={handleStepBack}
            podUploading={podUploading}
            podUploadingProgress={podUploadingProgress}
            step={step}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
}
