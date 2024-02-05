import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const ColorIconConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.custom?.purple.light,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.custom?.purple.light,
    },
  },
  [`&.${stepConnectorClasses.root}`]: {
    marginLeft: "unset",
    display: "flex",
    justifyContent: "center",
  },
  [`& .${stepConnectorClasses.line}`]: {
    transform: "translateY(-8px)",
    height: "calc(100% + 16px)",
    border: 0,
    width: 6,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.custom?.grey.lighter,
    borderRadius: 1,
  },
}));

export default ColorIconConnector;
