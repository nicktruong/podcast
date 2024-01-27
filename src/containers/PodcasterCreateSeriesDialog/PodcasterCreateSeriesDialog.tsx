import { Box, Button, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { PODCAST_CREATION_STEPS } from "@/common/enums";

import useHelper from "./useHelper";
import { ImageForm } from "./components/ImageForm";
import { EditSeriesDetail } from "./components/EditSeriesDetails";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function PodcasterCreateSeriesDialog({
  open,
  handleClose,
}: Props) {
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
  } = useHelper({ handleClose });

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
        break;
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
        break;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialogRoot}>
      <Box className={classes.dialogContainerRoot}>
        <CloseIcon onClick={handleClose} className={classes.closeIconRoot} />

        <form>{renderStep()}</form>

        <Box className="text-center mt-12">
          <Button
            variant="roundContained"
            className={classes.nextButtonRoot}
            onClick={handleNextStep}
          >
            {renderButtonText()}
          </Button>
          {/* for submitting series image */}
          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={handleImageSubmit}
          />
        </Box>
      </Box>
    </Dialog>
  );
}
