import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

import ColorStepIcon from "./components/ColorStepIcon";
import { ColorIconStepperProps } from "./interfaces";
import ColorIconConnector from "./components/ColorIconConnector";

// TODO: Make this component customizable
function ColorIconStepper({
  sx,
  stepsCount,
  activeStep,
  ...props
}: ColorIconStepperProps) {
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
      {Array(stepsCount)
        .fill(0)
        .map((_, index) => (
          <Step key={index} completed={false}>
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
