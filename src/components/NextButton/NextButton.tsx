import { Button, ButtonProps } from "@mui/material";
import { forwardRef } from "react";

const NextButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Button
        variant="contained"
        sx={{
          width: "100%",
          borderRadius: "200px",
          padding: "8px 32px",
          textTransform: "capitalize",
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontWeight: 700,
          display: "flex",
          minHeight: "48px",
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

NextButton.displayName = "StyledButton";

export default NextButton;
