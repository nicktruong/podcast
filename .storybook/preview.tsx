import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { darkTheme } from "../src/config";

import type { Preview } from "@storybook/react";
import "../.tailwind/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const withMuiTheme = (Story: any) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

export const decorators = [withMuiTheme];

export default preview;
