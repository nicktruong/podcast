import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { QontoStepperProps } from "./interfaces";
import { QontoStepIcon, QontoConnector } from "./components";

function QontoStepper({
  steps,
  activeStep,
  ...stepperProps
}: QontoStepperProps) {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<QontoConnector />}
      sx={(theme) => ({
        [theme.breakpoints.up("sm")]: {
          marginLeft: "16px",
          marginRight: "-32px",
        },
      })}
      {...stepperProps}
    >
      {steps.map((label) => (
        <Step key={label} sx={{ "&:first-of-type": { flex: 0 } }}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            sx={{
              "&:first-of-type": { alignItems: "flex-start" },
              "&:last-child": { alignItems: "flex-end" },
              "& .MuiStepLabel-iconContainer": {
                width: "18px",
                justifyContent: "center",
              },
            }}
          />
        </Step>
      ))}
    </Stepper>
  );
}

export default QontoStepper;
