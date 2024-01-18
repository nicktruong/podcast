import { Button, ButtonProps } from "@mui/material";
import { forwardRef } from "react";

const StyledButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Button
        variant="contained"
        sx={{
          width: "100%",
          borderRadius: "200px",
          paddingY: "8px",
          paddingX: "32px",
          textTransform: "capitalize",
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 700,
          display: "flex",
          minHeight: "48px",
          marginTop: "20px",
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

StyledButton.displayName = "StyledButton";

export default StyledButton;
