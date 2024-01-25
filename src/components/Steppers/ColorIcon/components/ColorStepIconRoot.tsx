import { styled } from "@mui/material/styles";

const ColorStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean; icon?: number };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    ownerState.icon === 1
      ? theme.palette.custom?.purple.light
      : theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: theme.palette.custom?.purple.light,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.custom?.purple.light,
  }),
}));

export default ColorStepIconRoot;
