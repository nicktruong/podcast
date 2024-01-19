import { styled } from "@mui/material/styles";

const ColorStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean; icon?: number };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    ownerState.icon === 1
      ? "#9691ff"
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
    backgroundColor: "#9691ff",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#9691ff",
  }),
}));

export default ColorStepIconRoot;
