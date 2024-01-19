import { Box, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { SignUpSteps } from "@/common/enums";

interface Props {
  steps: string[];
  activeStep: SignUpSteps;
  handlePrevStep: () => void;
}

export default function StepInfo({ handlePrevStep, activeStep, steps }: Props) {
  return (
    <Box sx={{ display: "flex" }} className="mt-2">
      <Box
        onClick={handlePrevStep}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: "0 0.4rem",
          "& svg": {
            color: "#a6a6a6",
          },
          "&:hover": {
            "& svg": {
              color: theme.palette.text.primary,
            },
          },
          [theme.breakpoints.up("sm")]: {
            width: "64px",
            padding: "0",
          },
        })}
      >
        <ArrowBackIosNewIcon />
      </Box>

      <Box sx={{ flex: 1, paddingRight: "1rem" }}>
        <Typography color="#a6a6a6" fontWeight={500}>
          Step {activeStep + 1} in {steps.length}
        </Typography>
        <Typography fontWeight={700}>{steps[activeStep]}</Typography>
      </Box>
    </Box>
  );
}
