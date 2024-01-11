import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren, ButtonProps {}

export default function RoundedButton({ children, sx, ...props }: Props) {
  return (
    <Button
      variant="outlined"
      sx={{
        padding: "3px 15px",
        fontSize: "0.8125rem",
        borderRadius: "200px",
        textTransform: "capitalize",
        fontWeight: 700,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
