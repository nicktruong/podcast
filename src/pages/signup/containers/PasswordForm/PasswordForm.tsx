import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

import StyledInput from "@/components/input/Input";
import StyledButton from "@/components/button/Button";
import HorizontalLinearStepper from "@/components/stepper/HorizontalLineStepper";

import { steps } from "../../constants";
import StepInfo from "../../components/StepInfo";

import { PasswordFormProps } from "./interfaces";

const PasswordForm = ({
  errors,
  control,
  activeStep,
  handlePrevStep,
  nextStepHandler,
}: PasswordFormProps) => {
  return (
    <>
      <Box className="max-w-[26rem] mx-auto sm:-translate-x-6">
        <HorizontalLinearStepper activeStep={activeStep} steps={steps} />
      </Box>

      <Box className="max-w-[26rem] mx-auto sm:-translate-x-6 pb-10">
        <StepInfo
          activeStep={activeStep}
          handlePrevStep={handlePrevStep}
          steps={steps}
        />

        <Box className="sm:pl-16 sm:pr-4 mt-4">
          <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
            Password
          </Typography>

          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <StyledInput
                  id="password"
                  variant="outlined"
                  error={!!errors.password}
                  type="password"
                  helperText={
                    errors.password && <span>{errors.password.message}</span>
                  }
                  {...field}
                />
              );
            }}
          />

          <Typography
            marginTop="8px"
            fontSize="14px"
            lineHeight="18px"
            color="#a6a6a6"
            fontWeight={500}
          >
            The password must contain at least 8 characters, 1 number and 1
            special character.
          </Typography>

          <StyledButton onClick={nextStepHandler}>Next</StyledButton>
        </Box>
      </Box>
    </>
  );
};

export default PasswordForm;
