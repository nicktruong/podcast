import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CircleIcon from "@mui/icons-material/Circle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { UploadPodBreadcrumbsProps } from "./interfaces";

export default function UploadPodBreadcrumbs({
  activeStep,
  steps,
}: UploadPodBreadcrumbsProps) {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {steps.map((step, index) => {
        const isActive = +activeStep === index || activeStep === step;

        return (
          <Box key={step}>
            <Typography
              sx={(theme) => ({
                display: "none",
                fontWeight: 700,
                fontSize: "16px",
                padding: "8px 8px 12px",
                borderBottom: isActive
                  ? `2px solid ${theme.palette.custom?.purple.main}`
                  : "2px solid transparent",
                color: isActive
                  ? theme.palette.custom?.purple.main
                  : theme.palette.text.secondary,
                [theme.breakpoints.up("md")]: {
                  display: "block",
                },
              })}
            >
              {step}
            </Typography>

            <CircleIcon
              sx={(theme) => ({
                fontSize: isActive ? "16px" : "12px",
                color: isActive
                  ? theme.palette.custom?.purple.main
                  : theme.palette.custom?.grey.main,
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              })}
            />
          </Box>
        );
      })}
    </Breadcrumbs>
  );
}
