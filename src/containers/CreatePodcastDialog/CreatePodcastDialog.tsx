import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog } from "@mui/material";

import { PODCAST_CREATION_STEPS } from "@/common/enums";

import usePrepareHook from "./helpers";
import { ImageForm } from "./components/ImageForm";
import { EditSeriesDetail } from "./components/EditSeriesDetails";

import type { PodcasterCreateSeriesDialogProps } from "./interfaces";

export default function CreatePodcastDialog({
  open,
  handleClose,
}: PodcasterCreateSeriesDialogProps) {
  const {
    step,
    errors,
    control,
    classes,
    fileRef,
    coverUrl,
    categories,
    handleNextStep,
    handleImageSubmit,
  } = usePrepareHook({ handleClose });

  const renderStep = () => {
    switch (step) {
      case PODCAST_CREATION_STEPS.INPUT_DETAILS:
        return (
          <EditSeriesDetail
            errors={errors}
            classes={classes}
            control={control}
            categories={categories}
          />
        );
      case PODCAST_CREATION_STEPS.UPLOAD_COVER_IMG:
      case PODCAST_CREATION_STEPS.CONFIRM_DETAILS_AND_CREATE:
        return (
          <ImageForm
            title={
              step === PODCAST_CREATION_STEPS.UPLOAD_COVER_IMG
                ? "Choose your cover art"
                : "Review your photo"
            }
            image={coverUrl}
            classes={classes}
          />
        );

      default:
        return <>404 Step not found!</>;
    }
  };

  const renderButtonText = () => {
    switch (step) {
      case PODCAST_CREATION_STEPS.INPUT_DETAILS:
        return "Continue";

      case PODCAST_CREATION_STEPS.UPLOAD_COVER_IMG:
        return "Upload an image";

      case PODCAST_CREATION_STEPS.CONFIRM_DETAILS_AND_CREATE:
        return "Continue";

      default:
        return <>404 Step not found!</>;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialogRoot}>
      <Box className={classes.dialogContainerRoot}>
        <CloseIcon onClick={handleClose} className={classes.closeIconRoot} />

        <form>{renderStep()}</form>

        <Box className="text-center mt-12">
          <Button
            onClick={handleNextStep}
            variant="roundedContained"
            className={classes.nextButtonRoot}
          >
            {renderButtonText()}
          </Button>
          {/* for submitting podcast image */}
          <input
            hidden
            type="file"
            ref={fileRef}
            onChange={handleImageSubmit}
          />
        </Box>
      </Box>
    </Dialog>
  );
}
