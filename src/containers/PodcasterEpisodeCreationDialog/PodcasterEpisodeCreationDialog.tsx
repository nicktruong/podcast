import * as React from "react";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import { EPISODE_CREATION_STEPS } from "@/common/enums";

import usePrepare from "./usePrepare";
import { DialogBar } from "./components/DialogBar";
import { UploadAudio } from "./components/UploadAudio";
import { EditDetails } from "./components/EditDetails";
import { ReviewPublish } from "./components/ReviewPublish";
import { BottomDialogBar } from "./components/BottomDialogBar";
import { PodcasterEpisodeCreationDialogProps } from "./interfaces";
import UploadPhoto from "./components/UploadPhoto/UploadPhoto";

export default function PodcasterEpisodeCreationDialog({
  open,
  handleClose,
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
  } = usePrepare({ handleClose });

  const renderStep = () => {
    switch (step) {
      case EPISODE_CREATION_STEPS.UPLOAD_AUDIO:
        return <UploadAudio onFileUpload={onFileUpload} />;

      case EPISODE_CREATION_STEPS.EDIT_DETAILS:
        return (
          <EditDetails control={control} errors={errors} onSubmit={onSubmit} />
        );

      case EPISODE_CREATION_STEPS.UPLOAD_PHOTO:
        return <UploadPhoto onFileUpload={onPhotoUpload} />;

      case EPISODE_CREATION_STEPS.REVIEW_PUBLISH:
        return <ReviewPublish podInfo={podInfo} user={user} image={image} />;

      default:
        return <>404 Step not found!</>;
    }
  };

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogBar handleClose={handleClose} step={step} />

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
        {step !== EPISODE_CREATION_STEPS.UPLOAD_AUDIO && (
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
