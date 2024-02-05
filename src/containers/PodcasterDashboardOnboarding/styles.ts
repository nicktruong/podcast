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
    maxWidth: "780px",
    borderRadius: "4px",
    margin: "32px auto",
    padding: "64px 16px",
    border: `1px solid ${theme.palette.custom?.grey.main}`,
  },
  onboardingSteps: {
    display: "flex",
    margin: "0 auto",
    maxWidth: "550px",
  },
  setupBtn: {
    marginTop: "8px",
    padding: "8px 32px",
    color: theme.palette.common.black,
    backgroundColor: theme.palette.custom?.purple.light,
    "&:hover": {
      backgroundColor: theme.palette.custom?.purple.lighter,
    },
  },
  letDoItBtn: {
    marginTop: "8px",
    padding: "8px 32px",
    color: theme.palette.common.black,
    backgroundColor: theme.palette.custom?.purple.light,
    "&:hover": {
      backgroundColor: theme.palette.custom?.purple.lighter,
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
