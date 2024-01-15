import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CircleIcon from "@mui/icons-material/Circle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Props {
  steps: string[];
  activeStep: string;
}

export default function UploadPodBreadcrumbs({ activeStep, steps }: Props) {
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
                  ? "2px solid #554dff"
                  : "2px solid transparent",
                color: isActive ? "#554dff" : theme.palette.text.secondary,
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
                color: isActive ? "#554dff" : "#b3b3b3",
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
