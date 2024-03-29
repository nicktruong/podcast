import { styled } from "@mui/material/styles";

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.custom?.grey.lighter,
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: theme.palette.primary.main,
    }),
    "& .QontoStepIcon-completedIcon": {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

export default QontoStepIconRoot;
