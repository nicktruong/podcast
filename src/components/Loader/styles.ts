import { keyframes } from "tss-react";
import { tss } from "tss-react/mui";

const rotate = keyframes`
  100% { transform: translateX(-50%) rotate(360deg)}
`;

const move = keyframes`
  0% { transform: rotate(10deg)}
  100% { transform: rotate(-10deg)}
`;

export const useStyles = tss.create(({ theme }) => ({
  center: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    position: "relative",
    width: "64px",
    height: "60px",
    marginRight: "24px",

    "&::after": {
      content: "''",
      position: "absolute",
      left: "0",
      bottom: "0",
      background: "#fff",
      width: "64px",
      height: "32px",
      borderRadius: "0 0 50px 50px",
      animation: `${move} 0.5s linear infinite alternate`,
    },

    "&::before": {
      content: "''",
      position: "absolute",
      left: "50%",
      top: "0",
      width: "24px",
      height: "24px",
      background: theme.palette.primary.main,
      transform: "translateX(-50%) rotate(0deg)",
      animation: `${rotate} 2s linear infinite`,
    },
  },
}));
