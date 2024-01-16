import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  appbarRoot: {
    width: "100%",
    padding: "12px 0",
    position: "absolute",
    backgroundColor: "transparent",
  },
  sidebarToggler: {
    width: "32px",
    height: "32px",
    color: theme.palette.text.secondary,
  },
  signUpBtn: {
    fontWeight: 700,
    padding: "8px 32px",
    borderRadius: "200px",
    textTransform: "capitalize",
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  loginBtn: {
    fontWeight: 700,
    padding: "8px 32px",
    borderRadius: "200px",
    textTransform: "capitalize",
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      background: theme.palette.common.white,
    },
  },
  mobileMenu: {
    "& .MuiMenuItem-root": {
      minWidth: "200px",
    },
  },
}));
