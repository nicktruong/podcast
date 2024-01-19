import * as React from "react";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import { EpisodeCreationSteps } from "@/common/enums";

import usePrepare from "./usePrepare";
import { DialogBar } from "./components/DialogBar";
import { UploadAudio } from "./components/UploadAudio";
import { EditDetails } from "./components/EditDetails";
import { ReviewPublish } from "./components/ReviewPublish";
import { BottomDialogBar } from "./components/BottomDialogBar";
import { PodcasterEpisodeCreationDialogProps } from "./interfaces";

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
    onSubmit,
    handleNext,
    onFileUpload,
    handleCancel,
    podUploading,
    handleStepBack,
    podUploadingProgress,
  } = usePrepare({ handleClose });

  const renderStep = () => {
    switch (step) {
      case EpisodeCreationSteps.UPLOAD_AUDIO:
        return <UploadAudio onFileUpload={onFileUpload} />;

      case EpisodeCreationSteps.EDIT_DETAILS:
        return (
          <EditDetails control={control} errors={errors} onSubmit={onSubmit} />
        );

      case EpisodeCreationSteps.REVIEW_PUBLISH:
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
