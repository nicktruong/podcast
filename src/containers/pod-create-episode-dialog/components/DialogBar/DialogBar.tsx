import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { CreateEpisodeSteps } from "@/common/constants/create-episode-steps";

import { UploadPodBreadcrumbs } from "../Breadcrumbs";

interface Props {
  handleClose: () => void;
  step: CreateEpisodeSteps;
}

export default function DialogBar({ step, handleClose }: Props) {
  return (
    <AppBar
      sx={(theme) => ({
        position: "relative",
        borderBottom: "1px solid #dedede",
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
            Create episode
          </Typography>

          <UploadPodBreadcrumbs
            activeStep={step}
            steps={Object.values(CreateEpisodeSteps)}
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
