import { StepperProps } from "@mui/material";

export interface ColorIconStepperProps extends StepperProps {
  stepsCount: number;
  activeStep: number;
}
