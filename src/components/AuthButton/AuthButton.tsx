import { forwardRef } from "react";
import { Button, ButtonProps } from "@mui/material";

const AuthButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Button
        variant="outlined"
        color="inherit"
        sx={{
          width: "100%",
          textTransform: "inherit",
          fontWeight: 800,
          fontSize: "16px",
          position: "relative",
          borderColor: "rgba(255, 255, 255, 0.23)",
          borderRadius: "200px",
          padding: "8px 32px 8px 55px",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 1)",
            backgroundColor: "inherit",
          },
          ...sx,
        }}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AuthButton.displayName = "AuthButton";

export default AuthButton;
