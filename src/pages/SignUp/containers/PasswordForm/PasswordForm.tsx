import { Controller } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import { StyledInput, NextButton } from "@/components";

import { PasswordFormProps } from "./interfaces";

export default function PasswordForm({
  errors,
  control,
  nextStepHandler,
}: PasswordFormProps) {
  return (
    <>
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
                type="password"
                variant="outlined"
                error={!!errors.password}
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

        <NextButton sx={{ marginTop: "20px" }} onClick={nextStepHandler}>
          Next
        </NextButton>
      </Box>
    </>
  );
}
