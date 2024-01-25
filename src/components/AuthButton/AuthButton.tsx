import { forwardRef } from "react";
import { Button, ButtonProps, alpha } from "@mui/material";

const AuthButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Button
        variant="outlined"
        color="inherit"
        sx={{
          ...(theme) => ({
            width: "100%",
            fontWeight: 800,
            fontSize: "16px",
            position: "relative",
            borderRadius: "200px",
            textTransform: "inherit",
            padding: "8px 32px 8px 55px",
            borderColor: alpha(theme.palette.common.white, 0.23),
            "&:hover": {
              backgroundColor: "inherit",
              borderColor: theme.palette.common.white,
            },
          }),
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
