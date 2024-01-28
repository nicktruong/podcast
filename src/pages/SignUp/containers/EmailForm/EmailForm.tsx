import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { Box, Button, Divider, Typography } from "@mui/material";

import { routes } from "@/common/constants";
import { StyledInput } from "@/components";
import { loginRedirectWithGoogle, loginRedirectWithFacebook } from "@/firebase";

import { usePrepare } from "./usePrepare";
import { EmailFormProps } from "./interfaces";

export default function EmailForm({
  control,
  errors,
  nextStepHandler,
}: EmailFormProps) {
  const { t } = usePrepare();

  return (
    <Box className="max-w-80 mx-auto pb-10">
      <Typography
        component="h1"
        sx={(theme) => ({
          fontWeight: "bold",
          lineHeight: "2.5rem",
          fontSize: "2.5rem",
          letterSpacing: "-0.05em",
          marginBottom: "2.5rem",
          [theme.breakpoints.up("md")]: {
            fontSize: "3rem",
            lineHeight: "3rem",
          },
        })}
      >
        <span>{t("signUpToStartListening")}</span>
      </Typography>

      <Box>
        <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
          {t("emailAddress")}
        </Typography>
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            return (
              <StyledInput
                id="email"
                placeholder="name@domain.com"
                variant="outlined"
                error={!!errors.email}
                helperText={
                  errors.email && <span>{t(errors.email.message ?? "")}</span>
                }
                {...field}
              />
            );
          }}
        />
        <Button
          variant="next"
          sx={{ marginTop: "20px" }}
          onClick={nextStepHandler}
        >
          {t("next")}
        </Button>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Divider
          sx={(theme) => ({
            "&::before, &::after": {
              borderColor: theme.palette.text.primary,
            },
          })}
        >
          {t("or")}
        </Divider>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Box>
          <Button
            variant="auth"
            startIcon={
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/google-icon.svg"}
                width={24}
                height={24}
                alt="Google Icon"
                className="absolute left-5 top-1/2 -translate-y-1/2"
              />
            }
            onClick={loginRedirectWithGoogle}
            sx={{ marginBottom: "8px" }}
          >
            {t("signUpWithGoogle")}
          </Button>
          <Button
            variant="auth"
            startIcon={
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/facebook-icon.svg"}
                width={24}
                height={24}
                alt="Facebook Icon"
                className="absolute left-5 top-1/2 -translate-y-1/2"
              />
            }
            onClick={loginRedirectWithFacebook}
          >
            {t("signUpWithFacebook")}
          </Button>
        </Box>

        <Divider sx={{ marginTop: 4 }} />

        <Typography
          sx={{
            marginTop: 4,
            textAlign: "center",
            fontSize: "1rem",
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          <span>{t("alreadyHaveAnAccount")} </span>
          <Link className="font-bold underline text-white" to={routes.login}>
            {t("loginHere")}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
