import {
  Box,
  AppBar,
  Button,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";

import { EpisodeCreationSteps } from "@/enums";

import { usePrepareHook } from "./helpers";
import { BottomDialogBarProps } from "./interfaces";

export default function BottomDialogBar({
  step,
  handleNext,
  podUploading,
  handleCancel,
  handleStepBack,
  podUploadingProgress,
}: BottomDialogBarProps) {
  const { t } = usePrepareHook();

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={(theme) => ({
        bottom: 0,
        top: "auto",
        backgroundColor: theme.palette.common.white,
        borderTop: `1px solid ${theme.palette.custom?.grey.light}`,
      })}
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
                {t("uploading")} ({podUploadingProgress}%)
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
                  {t("cancel")}
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ marginTop: "24px" }}>
            <Button
              variant="contained"
              sx={(theme) => ({
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "2rem",
                padding: "8px 32px",
                width: "fit-content",
                borderRadius: "200px",
                textTransform: "capitalize",
                color: theme.palette.common.black,
                backgroundColor: theme.palette.custom?.purple.light,
                "&:hover": {
                  backgroundColor: theme.palette.custom?.purple.lighter,
                },
              })}
              disabled={step === EpisodeCreationSteps.EDIT_DETAILS}
              onClick={handleStepBack}
            >
              {t("back")}
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
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: "16px",
            marginLeft: "auto",
            lineHeight: "2rem",
            padding: "8px 32px",
            width: "fit-content",
            borderRadius: "200px",
            textTransform: "capitalize",
            color: theme.palette.common.black,
            backgroundColor: theme.palette.custom?.purple.light,
            "&:hover": {
              backgroundColor: theme.palette.custom?.purple.lighter,
            },
          })}
        >
          {step === EpisodeCreationSteps.REVIEW_PUBLISH
            ? t("publish")
            : t("next")}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
