import { StepperProps } from "@mui/material/Stepper";

export interface QontoStepperProps extends StepperProps {
  steps: string[];
  activeStep: number;
}
