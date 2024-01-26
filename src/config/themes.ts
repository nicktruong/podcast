import { createTheme } from "@mui/material/styles";

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

const custom = {
  background: {
    main: "#121212",
    search: "#313131",
    nestedMenu: "#1f1f1f",
    gradient: "linear-gradient(to bottom, #222222, #121212)",
  },
  hover: {
    searchBorder: "#4f4f4f",
    cardBackground: "#282828",
  },
  purple: {
    main: "#554dff",
    light: "#9691ff",
    lighter: "#9e99ff",
  },
  grey: {
    main: "#c6c6c6",
    dark: "#a6a6a6",
    light: "#dedede",
    darker: "#898989",
    lighter: "#eaeaf0",
  },
};

export const darkTheme = createTheme({
  ...BASE_THEME,
  palette: {
    mode: "dark",
    primary: {
      main: "#1ed760",
      dark: "#1fdf64",
      light: "#1fdf64",
      contrastText: "#000000",
    },
    background: {
      paper: "#000000",
      default: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a7a7a7",
    },
    custom,
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
    custom,
  },
});
