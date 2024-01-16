import { tss } from "tss-react/mui";

export const useStyles = tss.withParams().create(({ theme }) => ({
  section: {
    borderRadius: "8px",
    backgroundColor: "#121212",
  },
  button: {
    padding: "12px",
  },
  active: {
    color: "#ffffff",
    "& .MuiTypography-root": {
      color: "#ffffff",
    },
  },
  icon: {
    fontSize: "28px",
    color: theme.palette.text.secondary,
  },
  text: {
    "& .MuiTypography-root": {
      fontWeight: 700,
      color: theme.palette.text.secondary,
    },
  },
}));
