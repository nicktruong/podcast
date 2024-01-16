import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper, { StepperProps } from "@mui/material/Stepper";

import ColorStepIcon from "./ColorStepIcon";
import ColorIconConnector from "./ColorIconConnector";

interface Props extends StepperProps {
  steps: string[];
  activeStep: number;
}

function ColorIconStepper({ steps, activeStep, sx, ...props }: Props) {
  return (
    <Stepper
      nonLinear
      activeStep={activeStep}
      connector={<ColorIconConnector />}
      orientation="vertical"
      sx={{
        height: "100%",
        ...sx,
      }}
      {...props}
    >
      {steps.map((label) => (
        <Step key={label} completed={false}>
          <StepLabel
            sx={{
              "& .MuiStepLabel-iconContainer": {
                paddingRight: "unset",
              },
            }}
            StepIconComponent={ColorStepIcon}
          />
        </Step>
      ))}
    </Stepper>
  );
}

export default ColorIconStepper;