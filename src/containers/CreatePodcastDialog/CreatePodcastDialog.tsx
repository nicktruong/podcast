import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog } from "@mui/material";

import usePrepareHook from "./helpers";

import type { PodcasterCreateSeriesDialogProps } from "./interfaces";

export default function CreatePodcastDialog({
  open,
  handleClose,
}: PodcasterCreateSeriesDialogProps) {
  const {
    classes,
    fileRef,
    renderStep,
    handleNextStep,
    renderButtonText,
    handleImageSubmit,
  } = usePrepareHook({ handleClose });

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
