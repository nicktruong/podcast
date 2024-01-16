import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    breakpoints?: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        "2xl": number;
      };
    };
  }
}

const BASE_THEME = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "'Fira Sans'",
      "'Droid Sans'",
      "'Helvetica Neue'",
      "sans-serif",
    ].join(","),
  },
};

export const darkTheme = createTheme({
  ...BASE_THEME,
  palette: {
    mode: "dark",
    primary: {
      main: "#1ed760",
      light: "#1fdf64",
      dark: "#1fdf64",
      contrastText: "#000000",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a7a7a7",
    },
  },
});

export const podcasterDashboardTheme = createTheme({
  ...BASE_THEME,
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#6a6a6a",
    },
  },
});
