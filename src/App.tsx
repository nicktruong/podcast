import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@sentry/react";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";

import theme from "./theme";

import "./App.css";

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary fallback={<p>An error has occurred</p>}>
      <ThemeProvider theme={theme}>
        <Typography variant="h1">
          <Suspense fallback="loading">
            <h1>{t("learnReact")}</h1>
          </Suspense>
        </Typography>
        <CssBaseline />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
