import { Box, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";

import { SignUpSteps } from "@/enums";

interface Props {
  steps: string[];
  activeStep: SignUpSteps;
  handlePrevStep: () => void;
}

export default function StepInfo({ handlePrevStep, activeStep, steps }: Props) {
  const { t } = useTranslation("pages/SignUp");

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
            color: theme.palette.custom?.grey.darker,
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
        <Typography
          sx={(theme) => ({
            color: theme.palette.custom?.grey.darker,
          })}
          fontWeight={500}
        >
          {t("step")} {activeStep + 1} in {steps.length}
        </Typography>
        <Typography fontWeight={700}>{steps[activeStep]}</Typography>
      </Box>
    </Box>
  );
}
