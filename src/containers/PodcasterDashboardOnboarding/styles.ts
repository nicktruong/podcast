import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  onboardingRoot: {
    padding: "40px 16px",
    [theme.breakpoints.up("md")]: {
      padding: "64px 40px",
    },
  },
  welcomeBox: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
  },
  welcomeHeader: {
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "32px",
  },
  onboardingContainer: {
    padding: "64px 16px",
    border: "1px solid #b7b7b7",
    borderRadius: "4px",
    margin: "32px auto",
    maxWidth: "780px",
  },
  onboardingSteps: {
    display: "flex",
    margin: "0 auto",
    maxWidth: "550px",
  },
  setupBtn: {
    marginTop: "8px",
    padding: "8px 32px",
  },
  letDoItBtn: {
    color: "#000000",
    marginTop: "8px",
    padding: "8px 32px",
    backgroundColor: "#9691ff",
    "&:hover": {
      backgroundColor: "#9e99ff",
    },
  },
  stepContent: {
    "&:first-of-type": {
      marginTop: "16px",
    },
    minHeight: "65px",
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
}));