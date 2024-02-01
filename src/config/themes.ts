import { Components, Theme, alpha, createTheme } from "@mui/material/styles";

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

const customPalette = {
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

const customComponents: Components<Omit<Theme, "components">> = {
  MuiButton: {
    variants: [
      {
        props: {
          variant: "auth",
        },
        style: ({ theme }) => {
          return {
            width: "100%",
            fontWeight: 800,
            fontSize: "16px",
            position: "relative",
            borderRadius: "200px",
            textTransform: "inherit",
            padding: "8px 32px 8px 55px",
            border: `1px solid ${alpha(theme.palette.common.white, 0.23)}`,
            "&:hover": {
              backgroundColor: "inherit",
              borderColor: theme.palette.common.white,
            },
          };
        },
      },
      {
        props: {
          variant: "next",
        },
        style: ({ theme }) => {
          return {
            width: "100%",
            display: "flex",
            fontWeight: 700,
            fontSize: "1rem",
            minHeight: "48px",
            padding: "8px 32px",
            lineHeight: "1.5rem",
            borderRadius: "200px",
            textTransform: "capitalize",
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,

            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          };
        },
      },
      {
        props: {
          variant: "round",
        },
        style: ({ theme }) => {
          return {
            fontWeight: 700,
            padding: "3px 15px",
            fontSize: "0.8125rem",
            borderRadius: "200px",
            textTransform: "capitalize",
            color: theme.palette.primary.main,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,

            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
          };
        },
      },
      {
        props: {
          variant: "roundedContained",
        },
        style: ({ theme }) => {
          return {
            fontWeight: 700,
            padding: "3px 15px",
            fontSize: "0.8125rem",
            borderRadius: "200px",
            textTransform: "capitalize",

            "&:hover": {
              // boxShadow: theme.shadows[4],
              borderColor: theme.palette.primary.main,
            },
          };
        },
      },
      {
        props: {
          variant: "roundedOutlined",
        },
        style: ({ theme }) => {
          return {
            fontWeight: 700,
            padding: "3px 15px",
            fontSize: "0.8125rem",
            borderRadius: "200px",
            textTransform: "capitalize",
            color: theme.palette.text.primary,
            border: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,

            "&:hover": {
              borderColor: theme.palette.text.primary,
            },
          };
        },
      },
    ],
  },
};

export const darkTheme = createTheme({
  ...BASE_THEME,
  components: customComponents,
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
    custom: customPalette,
  },
});

export const podcasterDashboardTheme = createTheme({
  ...BASE_THEME,
  components: customComponents,
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
    custom: customPalette,
  },
});
