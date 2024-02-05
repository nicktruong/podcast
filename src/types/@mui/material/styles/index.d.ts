import "@mui/material/styles";

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

  interface CustomPalette {
    custom?: {
      background: {
        main: string;
        search: string;
        gradient: string;
        nestedMenu: string;
      };
      hover: {
        searchBorder: string;
        cardBackground: string;
      };
      purple: {
        main: string;
        light: string;
        lighter: string;
      };
      grey: {
        main: string;
        dark: string;
        light: string;
        darker: string;
        lighter: string;
      };
    };
  }

  interface Palette extends CustomPalette {}

  interface PaletteOptions extends CustomPalette {}
}
