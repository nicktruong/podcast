import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { EPISODE_CREATION_STEPS } from "@/common/enums";

import { UploadPodBreadcrumbs } from "../Breadcrumbs";

import { usePrepare } from "./usePrepare";
import { DialogBarProps } from "./interfaces";

export default function DialogBar({ step, handleClose }: DialogBarProps) {
  const { t } = usePrepare();

  return (
    <AppBar
      sx={(theme) => ({
        position: "relative",
        borderBottom: `1px solid ${theme.palette.custom?.grey.light}`,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
      })}
      elevation={0}
    >
      <Toolbar
        sx={(theme) => ({
          width: "100%",
          margin: "0 auto",
          maxWidth: theme.breakpoints.values.lg,
        })}
      >
        <Box
          sx={(theme) => ({
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "14px 24px",
            flexDirection: "column",
            [theme.breakpoints.up("md")]: {
              padding: "20px 72px",
            },
          })}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              whiteSpace: "nowrap",
            }}
          >
            {t("createEpisode")}
          </Typography>

          <UploadPodBreadcrumbs
            activeStep={t(step)}
            steps={Object.values(EPISODE_CREATION_STEPS).map((stepValue) =>
              t(stepValue)
            )}
          />
        </Box>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon
            sx={(theme) => ({
              fontSize: "32px",
              color: theme.palette.text.secondary,
            })}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
