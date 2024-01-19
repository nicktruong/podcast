import { lighten } from "@mui/material";
import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
  modalContent: {
    top: "50%",
    left: "50%",
    width: "100%",
    padding: "32px",
    maxWidth: "460px",
    borderRadius: "8px",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    border: "2px solid rgba(255, 255, 255, 0.025)",
    boxShadow: "rgba(255, 255, 255, 0.025) 0px 5px 15px",
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
  modalHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: "24px",
  },
  ratingContainer: {
    display: "flex",
    marginTop: "64px",
    alignItems: "center",
    flexDirection: "column",
  },
  seriesImage: {
    width: "168px",
    height: "168px",
    borderRadius: "8px",
  },
  seriesTitle: {
    fontWeight: 700,
    marginTop: "24px",
    textAlign: "center",
  },
  rating: {
    marginTop: "12px",
  },
  submitBtn: {
    fontWeight: 700,
    fontSize: "16px",
    color: "#000000",
    marginTop: "40px",
    lineHeight: "20px",
    padding: "8px 16px",
    borderRadius: "200px",
    backgroundColor: "#ffffff",
    textTransform: "capitalize",

    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  remindLogin: {
    fontWeight: 700,
    fontSize: "20px",
    marginTop: "32px",
  },
}));
