import { Box, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { RoundedButton } from "@/components";
import { SeriesCreationSteps } from "@/common/enums";

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
    image,
    errors,
    control,
    classes,
    fileRef,
    categories,
    handleNextStep,
    handleImageSubmit,
  } = useHelper({ handleClose });

  const renderStep = () => {
    switch (step) {
      case SeriesCreationSteps.INPUT_SERIES_DETAILS:
        return (
          <EditSeriesDetail
            errors={errors}
            classes={classes}
            control={control}
            categories={categories}
          />
        );
      case SeriesCreationSteps.UPLOAD_SERIES_COVER_IMG:
      case SeriesCreationSteps.CONFIRM_DETAILS_AND_CREATION:
        return (
          <ImageForm
            title={
              step === SeriesCreationSteps.UPLOAD_SERIES_COVER_IMG
                ? "Choose your cover art"
                : "Review your photo"
            }
            image={image}
            classes={classes}
          />
        );

      default:
        break;
    }
  };

  const renderButtonText = () => {
    switch (step) {
      case SeriesCreationSteps.INPUT_SERIES_DETAILS:
        return "Continue";

      case SeriesCreationSteps.UPLOAD_SERIES_COVER_IMG:
        return "Upload an image";

      case SeriesCreationSteps.CONFIRM_DETAILS_AND_CREATION:
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
          <RoundedButton
            className={classes.nextButtonRoot}
            onClick={handleNextStep}
          >
            {renderButtonText()}
          </RoundedButton>
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
