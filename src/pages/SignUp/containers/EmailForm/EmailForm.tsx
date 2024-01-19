import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { Box, Divider, Typography } from "@mui/material";

import { routes } from "@/common/constants";
import { StyledInput, NextButton, AuthButton } from "@/components";
import { loginRedirectWithGoogle, loginRedirectWithFacebook } from "@/firebase";

import { EmailFormProps } from "./interfaces";

export default function EmailForm({
  control,
  errors,
  nextStepHandler,
}: EmailFormProps) {
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
        <span>Sign up to start listening</span>
      </Typography>

      <Box>
        <Typography fontSize="14px" fontWeight={700} marginBottom="8px">
          Email address
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
                helperText={errors.email && <span>{errors.email.message}</span>}
                {...field}
              />
            );
          }}
        />
        <NextButton sx={{ marginTop: "20px" }} onClick={nextStepHandler}>
          Next
        </NextButton>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Divider
          sx={(theme) => ({
            "&::before, &::after": {
              borderColor: theme.palette.text.primary,
            },
          })}
        >
          or
        </Divider>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Box>
          <AuthButton
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
            Sign up with Google
          </AuthButton>
          <AuthButton
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
            Sign up with Facebook
          </AuthButton>
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
          <span>Already have an account? </span>
          <Link className="font-bold underline text-white" to={routes.login}>
            Log in here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
