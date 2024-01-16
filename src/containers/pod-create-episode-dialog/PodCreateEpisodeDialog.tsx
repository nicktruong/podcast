import * as React from "react";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";

import { CreateEpisodeSteps } from "@/common/constants/create-episode-steps";

import useHelper from "./useHelper";
import { DialogBar } from "./components/DialogBar";
import { UploadAudio } from "./components/UploadAudio";
import { EditDetails } from "./components/EditDetails";
import { ReviewPublish } from "./components/ReviewPublish";
import { BottomDialogBar } from "./components/BottomDialogBar";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function PodCreateEpisodeDialog({ open, handleClose }: Props) {
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
  } = useHelper({ handleClose });

  const renderStep = () => {
    switch (step) {
      case CreateEpisodeSteps.UPLOAD_AUDIO:
        return <UploadAudio onFileUpload={onFileUpload} />;

      case CreateEpisodeSteps.EDIT_DETAILS:
        return (
          <EditDetails control={control} errors={errors} onSubmit={onSubmit} />
        );

      case CreateEpisodeSteps.REVIEW_PUBLISH:
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
        {step !== CreateEpisodeSteps.UPLOAD_AUDIO && (
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
