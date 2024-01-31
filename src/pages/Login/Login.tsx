import {
  Box,
  Alert,
  Divider,
  AlertTitle,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { AuthErrorCodes } from "firebase/auth";

import { routes } from "@/common/constants";
import { Logo, StyledInput } from "@/components";
import { loginRedirectWithGoogle, loginRedirectWithFacebook } from "@/firebase";
import { FacebookIconImg } from "@/assets";

import usePrepare from "./usePrepare";

export default function Login() {
  const { control, errors, isSubmitting, submitErrorCode, t, onSubmit } =
    usePrepare();

  return (
    <Box>
      <Box
        sx={(theme) => ({
          padding: "2rem",
          maxWidth: theme.breakpoints.values.xl,
          margin: "0 auto",
        })}
      >
        <Link to={routes.index}>
          <Logo />
        </Link>
      </Box>

      <Box className="px-8">
        <Box className="max-w-80 mx-auto">
          <Typography
            component="h1"
            sx={(theme) => ({
              fontWeight: "bold",
              fontSize: "2.5rem",
              lineHeight: "2.5rem",
              marginBottom: "2.5rem",
              letterSpacing: "-0.05em",
              [theme.breakpoints.up("md")]: {
                fontSize: "3rem",
                lineHeight: "3rem",
              },
            })}
          >
            <span>{t("loginTo")}</span>{" "}
            <span className="whitespace-nowrap">Go Podcast</span>
          </Typography>

          <form onSubmit={onSubmit}>
            {submitErrorCode && (
              <Alert severity="error" sx={{ marginBottom: "8px" }}>
                <AlertTitle>Error</AlertTitle>
                <strong>
                  {submitErrorCode === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
                    ? "Wrong credentials"
                    : "Something went wrong, please try again."}
                </strong>
              </Alert>
            )}

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
                      variant="outlined"
                      error={!!errors.email}
                      placeholder="name@domain.com"
                      helperText={t(errors.email?.message ?? "")}
                      {...field}
                    />
                  );
                }}
              />
            </Box>

            <Box sx={{ marginTop: "16px" }}>
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
                      placeholder="Password"
                      error={!!errors.password}
                      helperText={t(errors.password?.message ?? "")}
                      {...field}
                    />
                  );
                }}
              />
            </Box>

            <Button
              variant="next"
              sx={{ marginTop: "20px" }}
              type="submit"
              startIcon={isSubmitting && <Box width="20px" />}
              endIcon={
                isSubmitting && (
                  <CircularProgress
                    size="20px"
                    sx={(theme) => ({
                      color: theme.palette.primary.contrastText,
                    })}
                  />
                )
              }
            >
              {t("login")}
            </Button>
          </form>

          <Box sx={{ marginTop: "32px" }}>
            <Box>
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

            <Box sx={{ marginTop: "32px" }}>
              <Button
                variant="auth"
                startIcon={
                  <img
                    alt="Google Icon"
                    width={24}
                    height={24}
                    className="absolute left-5 top-1/2 -translate-y-1/2"
                    src={
                      process.env.PUBLIC_URL + "/assets/icons/google-icon.svg"
                    }
                  />
                }
                sx={{ marginBottom: "8px" }}
                onClick={loginRedirectWithGoogle}
              >
                {t("signInWithGoogle")}
              </Button>
              <Button
                variant="auth"
                startIcon={
                  <img
                    alt="Facebook Icon"
                    width={24}
                    height={24}
                    className="absolute left-5 top-1/2 -translate-y-1/2"
                    src={FacebookIconImg}
                  />
                }
                onClick={loginRedirectWithFacebook}
              >
                {t("signInWithFacebook")}
              </Button>
            </Box>

            <Divider sx={{ marginTop: "32px" }} />

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                marginTop: "32px",
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <span>{t("dontHaveAnAccount")} </span>
              <Link
                className="font-bold underline text-white block mt-1 pb-4"
                to={routes.signup}
              >
                {t("signUpForGoPodcast")}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
