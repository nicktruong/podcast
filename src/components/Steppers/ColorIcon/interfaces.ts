import { StepperProps } from "@mui/material";

export interface ColorIconStepperProps extends StepperProps {
  steps: string[];
  activeStep: number;
}
