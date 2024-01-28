import { Controller } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { StyledInput } from "@/components";

import { PasswordFormProps } from "./interfaces";

export default function PasswordForm({
  errors,
  control,
  nextStepHandler,
}: PasswordFormProps) {
  const { t } = useTranslation("SignUp");

  return (
    <>
      <Box className="sm:pl-16 sm:pr-4 mt-4">
        <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
          {t("password")}
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
                  errors.password && (
                    <span>{t(errors.password.message ?? "")}</span>
                  )
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
          sx={(theme) => ({
            color: theme.palette.custom?.grey.darker,
          })}
          fontWeight={500}
        >
          {t("invalidPassword")}
        </Typography>

        <Button
          variant="next"
          onClick={nextStepHandler}
          sx={{ marginTop: "20px" }}
        >
          {t("next")}
        </Button>
      </Box>
    </>
  );
}
