import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

import ColorStepIcon from "./components/ColorStepIcon";
import { ColorIconStepperProps } from "./interfaces";
import ColorIconConnector from "./components/ColorIconConnector";

function ColorIconStepper({
  sx,
  steps,
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
