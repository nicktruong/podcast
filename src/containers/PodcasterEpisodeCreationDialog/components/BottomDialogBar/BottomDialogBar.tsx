import {
  Box,
  AppBar,
  Button,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";

import { EpisodeCreationSteps } from "@/common/enums";

import { BottomDialogBarProps } from "./interfaces";

export default function BottomDialogBar({
  step,
  handleNext,
  podUploading,
  handleCancel,
  handleStepBack,
  podUploadingProgress,
}: BottomDialogBarProps) {
  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        bottom: 0,
        top: "auto",
        backgroundColor: "#ffffff",
        borderTop: "1px solid #dedede",
      }}
    >
      <Toolbar
        sx={(theme) => ({
          width: "100%",
          margin: "0 auto",
          padding: "16px 24px",
          alignItems: "flex-end",
          maxWidth: theme.breakpoints.values.lg,
        })}
      >
        <Box>
          {podUploading && (
            <Box
              sx={{
                display: "flex",
                columnGap: "8px",
                alignItems: "center",
              }}
            >
              <CircularProgress
                variant="determinate"
                value={podUploadingProgress}
                size="18px"
              />
              <Typography
                sx={(theme) => ({
                  fontSize: "12px",
                  color: theme.palette.text.primary,
                })}
              >
                Uploading ({podUploadingProgress}%)
              </Typography>
              {podUploadingProgress < 100 && (
                <Typography
                  component="button"
                  sx={(theme) => ({
                    fontSize: "12px",
                    color: theme.palette.text.secondary,
                    fontWeight: 700,
                    textDecoration: "underline",
                  })}
                  onClick={handleCancel}
                >
                  Cancel
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ marginTop: "24px" }}>
            <Button
              variant="contained"
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                color: "#000000",
                lineHeight: "2rem",
                padding: "8px 32px",
                width: "fit-content",
                borderRadius: "200px",
                backgroundColor: "#9691ff",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#9e99ff",
                },
              }}
              disabled={step === EpisodeCreationSteps.EDIT_DETAILS}
              onClick={handleStepBack}
            >
              Back
            </Button>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={
            step === EpisodeCreationSteps.REVIEW_PUBLISH &&
            podUploadingProgress < 100
          }
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            color: "#000000",
            marginLeft: "auto",
            lineHeight: "2rem",
            padding: "8px 32px",
            width: "fit-content",
            borderRadius: "200px",
            backgroundColor: "#9691ff",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#9e99ff",
            },
          }}
        >
          {step === EpisodeCreationSteps.EDIT_DETAILS ? "Next" : "Publish"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
