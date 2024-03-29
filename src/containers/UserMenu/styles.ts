import { tss } from "tss-react/mui";
import { red } from "@mui/material/colors";

export const useStyles = tss.create(({ theme }) => ({
  alignCenter: {
    gap: "4px",
    display: "flex",
    alignItems: "center",
  },
  appbarRoot: {
    width: "100%",
    padding: "12px 0",
    position: "absolute",
    backgroundColor: "transparent",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  iconButtonContainer: {
    marginLeft: "-10px",
  },
  sidebarToggler: {
    width: "32px",
    height: "32px",
    color: theme.palette.text.secondary,
  },
  searchContainer: {
    gap: "4px",
    width: "100%",
    display: "flex",
    maxWidth: "325px",
    alignItems: "center",
    position: "relative",
  },
  searchIcon: {
    zIndex: 1,
    left: "12px",
    fontSize: "20px",
    position: "absolute",
  },
  searchInput: {
    width: "100%",
    fontSize: "14px",
    borderRadius: "200px",
    padding: "16px 16px 16px 36px",
    border: "1px solid transparent",
    backgroundColor: theme.palette.custom?.background.search,

    "&:hover": {
      border: `1px solid ${theme.palette.custom?.hover.searchBorder}`,
    },

    "&:focus": {
      outline: "none",
      border: `1px solid ${theme.palette.common.white}`,
    },
  },
  actions: {
    gap: "4px",
    flexShrink: 0,
    display: "flex",
    marginLeft: "auto",
    alignItems: "center",
  },
  notificationContainer: {
    padding: "8px",
    position: "relative",
  },
  notificationCount: {
    top: "-2px",
    right: "-2px",
    width: "16px",
    height: "16px",
    display: "flex",
    fontWeight: 700,
    fontSize: "12px",
    borderRadius: "50%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: red[500],
  },
  notificationIcon: {},
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
