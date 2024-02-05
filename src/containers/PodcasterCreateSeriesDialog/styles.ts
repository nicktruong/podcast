import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  dialogRoot: {
    "& .MuiPaper-root": {
      width: "780px",
      maxWidth: "780px",
      borderRadius: "16px",
      position: "relative",
    },
  },
  dialogContainerRoot: {
    padding: "56px",
  },
  closeIconRoot: {
    top: "24px",
    left: "24px",
    fontSize: "32px",
    cursor: "pointer",
    position: "absolute",
    color: theme.palette.text.secondary,
  },
  headingRoot: {
    textAlign: "center",
  },
  dialogHeading: {
    fontWeight: 700,
    fontSize: "32px",
  },
  dialogDesc: {
    fontWeight: 500,
    fontSize: "18px",
    marginTop: "12px",
    color: theme.palette.text.secondary,
  },
  formGroup: {
    marginTop: "12px",
  },
  inputLimit: {
    fontWeight: 500,
    fontSize: "14px",
    marginTop: "12px",
    textAlign: "right",
    color: theme.palette.text.secondary,
  },
  selectRoot: {
    width: "100%",
  },
  nextButtonRoot: {
    border: "none",
    marginTop: "8px",
    fontSize: "16px",
    padding: "8px 32px",
    color: theme.palette.common.black,
    backgroundColor: theme.palette.custom?.purple.light,

    "&:hover": {
      border: "none",
      backgroundColor: theme.palette.custom?.purple.lighter,
    },
  },
  coverArtRoot: {
    width: "300px",
    height: "300px",
    margin: "24px auto 0",
  },
  coverArtPlaceHolder: {
    width: "300px",
    height: "300px",
    color: theme.palette.custom?.grey.main,
  },
}));
